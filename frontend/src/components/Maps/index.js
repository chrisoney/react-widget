import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './maps.module.css';

import { fetchAllMaps } from '../../store/map';
import { fetchUserMaps } from '../../store/session';

const Maps = () => {
  const currentSession = useSelector(state => state.session);
  const maps = useSelector(state => state.maps.maps);
  const dispatch = useDispatch();
  const [myMapIds, setMyMapIds] = useState([]);

  useEffect(() => {
    dispatch(fetchAllMaps());
    dispatch(fetchUserMaps(currentSession.user.id))
  }, [dispatch, currentSession])

  useEffect(() => {
    setMyMapIds(currentSession.maps)
  }, [currentSession])

  return (
    <div className={styles.map_list_container}>
      <div className={styles.map_list_title}>My Maps</div>
      <ul className={styles.map_list}>
        {myMapIds.map(mapId => {
          const map = maps[mapId];
          return (<Link to={`/maps/${mapId}`}>{map.title}</Link>)
        })}
      </ul>
    </div>
  )
}

export default Maps;