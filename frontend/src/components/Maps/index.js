import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './maps.module.css';


const Maps = () => {
  const sessionUser = useSelector(state => state.session.user);
  const maps = useSelector(state => state.maps.maps);
  const dispatch = useDispatch();
  const [myMaps, setMyMaps] = useState([]);


  useEffect(() => {
    dispatch(getUserMaps())
  }, [dispatch])

  return (
    <div className={styles.map_list_container}>
      <div className={styles.map_list_title}>My Maps</div>
      <ul className={styles.map_list}>
      </ul>
    </div>
  )
}

export default Maps;