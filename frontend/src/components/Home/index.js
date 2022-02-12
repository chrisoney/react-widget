import React from 'react';
import { Link } from 'react-router-dom';

import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.widget_choice_container}>
      <Link to='/maps'>Maps</Link>
    </div>
  )
}

export default Home;