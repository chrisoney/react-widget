import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './sidebar.module.css';
import { setAttr } from '../../store/hexagon';

const Sidebar = () => {
  const dispatch = useDispatch();
  const colors = ['orange', 'blue', 'yellow', 'green', 'purple'];

  const onClick = (type, value) => {
    dispatch(setAttr({ type, value }))
  }

  return (
    <div className={styles.main_sidebar_area}>
      {colors.map((color, idx) => {
        return (
          <div className={styles.color_sample_container} key={`color-${idx}`}>
            <div 
            className={styles.color_sample}
            style={{backgroundColor: color }}
            onClick={() => onClick('color', color)}
            ></div>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar;