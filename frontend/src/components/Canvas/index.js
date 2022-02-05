import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './canvas.module.css'

// Get mouse location
// const x = e.pageX - canvasRef.current.getBoundingClientRect().left;
// const y = e.pageY - canvasRef.current.getBoundingClientRect().top;

const Canvas = (_props) => {  
  const canvasRef = useRef(null);
  let context;
  // hex info
  const angle = 2 * Math.PI / 6;
  const radius = 50;
  const hexAttrs = useSelector(state => state.hexagon.attributes)
  // set the initial hexagons. This will eventually be loaded from the backend but let's start simpler
  const [hexagons, setHexagons] = useState([{ x: 500, y: 300, color: 'blue' }])
  // the ghost is the temporary hexagon that exists on hover
  const [ghost, setGhost] = useState(null)

  const clickHandler = (e) => {
    // checks for the existance of a ghost hexagon
    if (ghost) {
      //adds the ghost if it exists 
      setHexagons([...hexagons, ghost])
    }
  }

  const testStart = (e) => {
    e.preventDefault()
    // calculate mouse position
    const x = e.pageX - canvasRef.current.getBoundingClientRect().left;
    const y = e.pageY - canvasRef.current.getBoundingClientRect().top;
    const mouse = {x, y}
    // generate a hexagon for each that should exist on the page
    hexagons.forEach(hex => generateHexagons(hex, mouse))
  }

  const generateHexagons = (loc, mouse) => {
    const centerX = loc.x;
    const centerY = loc.y;
    // figure out where the center would be for each of the surrounding hexagons
    const newCenters = [
      { x: centerX, y: centerY - 86.6 }, // top
      { x: centerX + 75, y: centerY - 43.3 }, // top right unfinished
      { x: centerX + 75, y: centerY + 43.3 }, // bottom right unfinished
      { x: centerX, y: centerY + 86.6 }, // bottom unfinished
      { x: centerX - 75, y: centerY - 43.3 }, // bottom left unfinished
      { x: centerX - 75, y: centerY + 43.3 }, // top left unfinished
    ]
    newCenters.forEach(center => checkMouseInHex(center, mouse))
  }

  const hexExists = (hex) => {
    // simple iteration through existing hexagons to see if the proposed ghost hex should be displayed. may scrap later
    for (let i = 0; i < hexagons.length; i++) {
      const oldHex = hexagons[i];
      if (hex.x === oldHex.x && hex.y === oldHex.y) return true;
    }
    return false;
  }

  const checkMouseInHex = (center, mouse) => {
    // mouse positions
    const x = mouse.x;
    const y = mouse.y;

    // calculating different edges of current hexagon
    const polyX = [-25, 25, 50, 25, -25, -50].map(num => center.x + num);
    const polyY = [-43.3, -43.3, 0, 43.3, 43.3, 0].map(num => center.y + num);
    
    // iterating through the edges, checking to see if the mouse is currently within one of those other areas
    let j = 5;
    let oddNodes = false;
    for (let i = 0; i < 6; i++) {
      if ((polyY[i] < y && polyY[j] >= y) || (polyY[j] < y && polyY[i] >= y)) {
        if (polyX[i] + (y - polyY[i]) / (polyY[j] - polyY[i]) * (polyX[j] - polyX[i] ) < x) {
          oddNodes = !oddNodes;
        }
      }
      j = i;
    }
    if (oddNodes) {
      // at this point we're setting the ghost, so it could be a good place to check if an existing hex is there
      if (!hexExists(center)) setGhost({ ...center, color: hexAttrs.color })
    }
  }

  function drawHexagon(x, y, color) {
    context.beginPath();
    for (var i = 0; i < 6; i++) {
      context.lineTo(x + radius * Math.cos(angle * i), y + radius * Math.sin(angle * i));
    }
    context.closePath();
    context.fillStyle = color;
    context.fill()
    context.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current
    context = canvas.getContext('2d')
    // Draw for the board
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    // Existing hexagons
    hexagons.forEach((hex) => drawHexagon(hex.x, hex.y, hex.color))
    
    // rerender the canvas when ghost changes
    if (ghost) {
      drawHexagon(ghost.x, ghost.y, hexAttrs.color)
    }
  }, [ghost])
  
  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onClick={clickHandler}
        onMouseMove={testStart}
        height="600px"
        width="1000px" />
    </>
  )
}

export default Canvas;