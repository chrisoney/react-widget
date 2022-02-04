import React, { useRef, useEffect, useState } from 'react'
import styles from './canvas.module.css'

// Get mouse location
// const x = e.pageX - canvasRef.current.getBoundingClientRect().left;
// const y = e.pageY - canvasRef.current.getBoundingClientRect().top;

const Canvas = (props) => {  
  const canvasRef = useRef(null)
  let context;
  // hex info
  const angle = 2 * Math.PI / 6;
  const radius = 50;
  // set the initial hexagons. This will eventually be loaded from the backend but let's start simpler
  const [hexagons, setHexagons] = useState([{ x: 500, y: 300 }])
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
    const x = e.pageX - canvasRef.current.getBoundingClientRect().left;
    const y = e.pageY - canvasRef.current.getBoundingClientRect().top;
    const mouse = {x, y}
    hexagons.forEach(hex => generateHexagons(hex, mouse))
    
  }

  const generateHexagons = (loc, mouse) => {
    const centerX = loc.x;
    const centerY = loc.y;
    const newCenters = [
      { x: centerX, y: centerY - 86.6 }, // top
      { x: centerX + 75, y: centerY - 43.3 }, // top right unfinished
      { x: centerX + 75, y: centerY + 43.3 }, // bottom right unfinished
      { x: centerX, y: centerY + 86.6 }, // bottom unfinished
      { x: centerX - 75, y: centerY - 43.3 }, // bottom left unfinished
      { x: centerX - 75, y: centerY + 43.3 }, // top left unfinished
    ]
    newCenters.forEach(center => test(center, mouse))
  }

  const test = (center, mouse) => {
    const x = mouse.x;
    const y = mouse.y;
    let j= 5;
    let oddNodes=false;
    const polyX = [-25, 25, 50, 25, -25, -50].map(num => center.x + num);
    const polyY = [-43.3, -43.3, 0, 43.3, 43, 3, 0].map(num => center.y + num);
    for (let i=0; i<6; i++) {
      if ((polyY[i]<y && polyY[j]>=y)
        || (polyY[j] < y && polyY[i] >= y))
      {
        if (polyX[i]+(y-polyY[i])/(polyY[j]-polyY[i])*(polyX[j]-polyX[i])<x) {
          oddNodes = !oddNodes;
        }
      }
      j = i;
    }
    if (oddNodes) setGhost(center)
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
    hexagons.forEach((hex) => drawHexagon(hex.x, hex.y, 'blue'))

    if (ghost) {
      drawHexagon(ghost.x, ghost.y, 'red')
    }
  }, [ghost])
  
  return (
    <>
      {/* <button onClick={test}>click</button> */}
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

export default Canvas