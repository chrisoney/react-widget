import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);

  return (sessionLoaded && user)
    ? <Outlet />
    : <Navigate to='/login' />;
  // return (
  //   <Route {...props}>
  //     {(sessionLoaded && user)
  //       ? props.children
  //       : (sessionLoaded && !user)
  //         ? <Navigate to='/'/>
  //         : null}
  //   </Route>
  // )
};


export default ProtectedRoute;