import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Dashboard from '@pages/Dashboard';
import JoinUs from '@pages/JoinUs';
import { checkAuth, loginWithJwtToken } from '@api/auth/authFetcher';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser } from '@redux/actions/auth';

function Landing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    /*
    Everytime this page loads,
    - first check for query params login
    - then try to login using cookie
    - if none are successful, then user is not logged in
    */
    const queryJwtToken = queryParams.get('jwtToken');
    const isNew = queryParams.get('new');

    // login using the query params if they exist
    if (queryJwtToken) {
      const jwtLoginRes = await loginWithJwtToken(queryJwtToken);
      if (jwtLoginRes.success) {
        Cookies.set('jwtToken', jwtLoginRes.data.jwtToken);
        if (isNew === 'true') {
          history.push('/register');
        } else {
          history.push('/');
        }
      }
    }

    // query Params dont exist, so login using cookies
    const userRes = await checkAuth();
    if (userRes.success) {
      dispatch(setUser(userRes.data.user));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
      <>
          {loading ? (
              <>Loading...</>
      ) : (
          <>{isLoggedIn ? <Dashboard /> : <JoinUs />}</>
      )}
      </>
  );
}
export default Landing;
