import React from 'react';
import { useSelector } from 'react-redux';
import JoinUs from '@pages/Landing/JoinUs';
import Home from '@pages/Home';

function Landing() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  return (
      <>
          {isLoggedIn && user ? <Home /> : <JoinUs />}
      </>
  );
}
export default Landing;
