import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import JoinUs from '@pages/JoinUs';
import Dashboard from '@pages/Dashboard';
import EditQuiz from '@pages/EditQuiz';
import GiveQuiz from '@pages/GiveQuiz';
import CheckQuiz from '@pages/CheckQuiz';
import Components from '@pages/Components';
import Page404 from '@pages/404';
import LoadingPage from '@pages/Loading';

import { setUser } from '@actions/auth';
import { checkAuth, loginWithJwtToken } from '@api/auth/authFetcher';
import log from '@utils/log';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    // TODO: use react-query
    const queryParams = new URLSearchParams(window.location.search);
    const queryJwtToken = queryParams.get('jwtToken');
    const isNew = queryParams.get('new');

    // login using the query params if they exist
    log('login using the query params if they exist', {
      queryJwtToken,
      isNew,
    });
    if (queryJwtToken) {
      const jwtLoginRes = await loginWithJwtToken(queryJwtToken);
      log({ jwtLoginRes });
      if (jwtLoginRes.success) {
        Cookies.set('jwtToken', jwtLoginRes.data.jwtToken);
        history.push('/');
      }
    }

    // query Params dont exist, so login using cookies
    log('query Params dont exist, so login using cookies');
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
              <LoadingPage />
      ) : (
          <Switch>
              {/* Dashboard page */}
              <Route exact path="/" component={isLoggedIn ? Dashboard : JoinUs} />
              {/* Create or edit a quiz */}
              <Route path="/quiz/edit/:quizID" component={EditQuiz} />
              {/* Check a quiz */}
              <Route path="/quiz/check/:quizID" component={CheckQuiz} />
              {/* Attempt a quiz */}
              <Route path="/quiz/attempt/:quizID" component={GiveQuiz} />
              {/* Demo page for components */}
              <Route exact path="/components" component={Components} />
              {/* 404 Page */}
              <Route path="" component={Page404} />
          </Switch>
      )}
      </>
  );
};
export default App;
