import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './mapArea.module.css';
import Sidebar from '../Sidebar';
import Canvas from '../Canvas';
import { editMap } from '../../store/map';


const MapArea = (id) => {
  const map = useSelector(state => state.maps.maps[id]);
  const dispatch = useDispatch();
  const [startingAttrs, setStartingAttrs] = useState({
    color: 'blue',
    image: null
  });
  const saveMap = () => {
    dispatch(editMap(id, map, startingAttrs));
  }
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }

  return (
    <div className={styles.main_map_container}>
      <div className={styles.main_map_area}>
        <Canvas
          draw={draw}
          outerHexagons={map || []}
          setStartingAttrs={setStartingAttrs}
        />
      </div>
      <div className={styles.sidebar_container}>
        <Sidebar saveMap={saveMap} setStartingAttrs={setStartingAttrs}/>
      </div>
    </div>
  )
}

export default MapArea;