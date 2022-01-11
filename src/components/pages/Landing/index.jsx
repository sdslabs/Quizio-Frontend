import React, { useState, useEffect } from 'react';
import Home from '@pages/Home';
import JoinUs from '@pages/JoinUs';
// import { login } from '@api/auth';

function Landing() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    // const loginRes = await login();
    // console.log({ loginRes });
    setIsLoggedIn(false);
    setIsLoading(false);
  }, []);

  return (
      <>
          {isLoading ? <>Loading...</> : <>{isLoggedIn ? <Home /> : <JoinUs />}</>}
      </>
  );
}
export default Landing;
