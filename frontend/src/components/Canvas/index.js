import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import styles from './canvas.module.css'

// Get mouse location
// const x = e.pageX - canvasRef.current.getBoundingClientRect().left;
// const y = e.pageY - canvasRef.current.getBoundingClientRect().top;

const Canvas = ({ outerHexagons, setStartingAttrs }) => {  
  const canvasRef = useRef(null);
  let context;
  // hex info
  const angle = 2 * Math.PI / 6;
  const radius = 50;
  const hexAttrs = useSelector(state => state.hexagon.attributes)
  // set the initial hexagons. This will eventually be loaded from the backend but let's start simpler
  const [hexagons, setHexagons] = useState([...outerHexagons])
  // the ghost is the temporary hexagon that exists on hover
  const [ghost, setGhost] = useState(null)

  const clickHandler = (_e) => {
    // checks for the existance of a ghost hexagon
    if (ghost) {
      //adds the ghost if it exists 
      setHexagons([...hexagons, ghost])
    }
  }

  // Not a great fix. I'd like the logic to be more along the lines of "if we're no longer next to a hexagon, disappear that ghost"
  const mouseLeave = (e) => {
    setGhost(null)
  }

  const mapStart = (e) => {
    e.preventDefault()
    // calculate mouse position
    const x = e.pageX - canvasRef.current.getBoundingClientRect().left;
    const y = e.pageY - canvasRef.current.getBoundingClientRect().top;
    const mouse = { x, y }
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
      const diffX = Math.abs(hex.x - oldHex.x);
      const diffY = Math.abs(hex.y - oldHex.y);
      // trying to help estimate if a hex already exists. Might need to change based on how things progress
      if (diffX < 1 && diffY < 1) {
        return true;
      }
    }
    return false;
  }

  const checkMouseInHex = (center, mouse) => {
    // mouse positions
    const { x, y }  = mouse;

    // calculating different edges of current hexagon
    const polyX = [-25, 25, 50, 25, -25, -50].map(num => center.x + num);
    const polyY = [-43.3, -43.3, 0, 43.3, 43.3, 0].map(num => center.y + num);
    
    
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
      const existingHex = hexExists(center)
      if (!existingHex) {
        setGhost({ ...center, color: hexAttrs.color })
      } else {
        setGhost(null)
      }
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

  useEffect(() => {
    setStartingAttrs({...hexAttrs});
  }, [hexAttrs])
  
  return (
    <div className={styles.main_map_container}>
      <div className={styles.main_map_area}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onClick={clickHandler}
          onMouseMove={mapStart}
          onMouseLeave={mouseLeave}
          // style={{height: '100%', width: '100%'}}
          height="500px"
          width="500px"
        />
      </div>
      <div className={styles.sidebar_container}>
        <Sidebar />
      </div>
    </div>
  )
}

export default Canvas;