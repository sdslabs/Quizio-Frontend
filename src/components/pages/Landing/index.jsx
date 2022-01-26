import React, { useState, useEffect } from 'react';
import Dashboard from '@pages/Dashboard';
import JoinUs from '@pages/JoinUs';
import { checkAuth } from '@api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@redux/actions/auth';
// import { check } from 'prettier';

function Landing() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const jwtToken = queryParams.get('jwtToken');

    if (jwtToken == null) {
      dispatch(setUser({}));
      setIsLoggedIn(false);
    } else {
      const checkAuthRes = await checkAuth(jwtToken);
      if (checkAuthRes.success) {
        // TODO : if user is new user | show register  page

        // else show dashboard
        dispatch(setUser(checkAuthRes.data.user));
        setIsLoggedIn(true);
      } else {
        dispatch(setUser({}));
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
      <div>
          <>{isLoggedIn ? <Dashboard /> : <JoinUs />}</>
      </div>
  );
}
export default Landing;
