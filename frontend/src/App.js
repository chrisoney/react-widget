import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation";
import MapArea from "./components/MapArea";
import Home from './components/Home';
import Splash from './components/Splash';
import Maps from './components/Maps';
import * as sessionActions from "./store/session";

import ProtectedRoute from "./components/utils/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Routes>
        <Route path="/" exact={'true'} element={sessionUser ? <Home /> : <Splash />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/maps/:id(\\d+)" exact={'true'} element={<MapArea />} />
        <Route path="/login" element={<LoginFormPage />} />
        <Route path="/signup" element={<SignupFormPage />} />
      </Routes>}
    </>
  );
}

export default App;
