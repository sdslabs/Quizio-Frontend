import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginWithJwtToken } from '@api/auth';
import LoginWithGoogle from '@components/Buttons/LoginWithGoogle';
import LoginWithGithub from '@components/Buttons/LoginWithGithub';

function Login() {
  const { search } = useLocation();
  const history = useHistory();

  useEffect(async () => {
    const queryJwtToken = new URLSearchParams(search).get('jwtToken');
    const isNewUser = new URLSearchParams(search).get('new');

    if (queryJwtToken) {
      // login using the query params if they exist
      const jwtLoginRes = await loginWithJwtToken(queryJwtToken);

      if (jwtLoginRes.success) {
        Cookies.set('jwtToken', jwtLoginRes.data.jwtToken);
        if (isNewUser === 'true') {
          history.push('/register');
        } else {
          history.push('/dashboard');
        }
      }
    }
  });

  return (
      <div className="flex flex-col items-center space-y-10">
          <div className="flex justify-center items-center">Welcome to Quizio!</div>
          <LoginWithGoogle />
          <LoginWithGithub />
      </div>
  );
}
export default Login;
