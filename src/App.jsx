import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import Register from '@pages/Register';
import CreateQuiz from '@pages/CreateQuiz';
import JoinUs from '@pages/JoinUs';
import GiveQuiz from '@pages/GiveQuiz/index';
import Dashboard from '@pages/Dashboard';

import { setUser } from '@redux/actions/auth';
import { checkAuth, loginWithJwtToken } from '@api/auth/authFetcher';
import './index.css';
import Profile from '@components/pages/Profile';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    const queryParams = new URLSearchParams(window.location.search);
    /*
      Everytime We are on Quizio loads,
      - first check for query params login
      - then try to login using cookie
      - if none are successful, then user is not logged in
      */

    // setIsLoggedIn(true);
    // setLoading(false);

    const queryJwtToken = queryParams.get('jwtToken');
    const isNew = queryParams.get('new');

    // login using the query params if they exist
    console.log('login using the query params if they exist', { queryJwtToken, isNew });
    if (queryJwtToken) {
      const jwtLoginRes = await loginWithJwtToken(queryJwtToken);
      console.log({ jwtLoginRes });
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
    console.log('query Params dont exist, so login using cookies');
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
          <>
              {isLoggedIn ? (
                  <Switch>
                      {/* Dashboard page */}
                      <Route exact path="/" component={Dashboard} />
                      {/* Registration Page */}
                      <Route exact path="/register" component={Register} />
                      {/* Create or edit a quiz */}
                      <Route exact path="/quiz/create" component={CreateQuiz} />
                      {/* Create or edit a quiz */}
                      <Route exact path="/quiz/edit" component={CreateQuiz} />
                      {/* Check a quiz */}
                      <Route path="/quiz/check/:quizID" component={CreateQuiz} />
                      {/* Attempt a quiz */}
                      <Route path="/quiz/:quizID" component={GiveQuiz} />
                      {/* Private profile page */}
                      <Route path="/profile/:profileID" component={Profile} />
                  </Switch>
          ) : (
              <Switch>
                  <Route exact path="/" component={JoinUs} />
                  <Route path="/profile/:profileID" component={Profile} />
              </Switch>
          )}
          </>
      )}
      </>
  );
};
export default App;
