import React, { useState, useEffect } from 'react';
import Dashboard from '@pages/Dashboard';
import JoinUs from '@pages/JoinUs';
import { checkAuth } from '@api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@redux/actions/auth';

function Landing() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    // try to login using existing jwt Token
    const checkAuthRes = await checkAuth();
    if (checkAuthRes.success) {
      dispatch(setUser(checkAuthRes.data.user));
      setIsLoggedIn(true);
    } else {
      dispatch(setUser({}));
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  return (
      <>
          {isLoading ? (
              <> Loading... </>
      ) : (
          <>{isLoggedIn ? <Dashboard /> : <JoinUs />}</>
      )}
      </>
  );
}
export default Landing;
