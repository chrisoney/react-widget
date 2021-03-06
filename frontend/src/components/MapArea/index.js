import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './mapArea.module.css';
import Canvas from '../Canvas';


const MapArea = () => {
  const id = useParams();
  const map = useSelector(state => state.maps.maps[id]);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

  return (      
    <Canvas
      draw={draw}
      outerHexagons={map || []}
      id={id}
    />      
  )
}

export default MapArea;