// import { Logout } from '@api/auth';
import { logout } from '@redux/actions/auth';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JoinUs from '@components/JoinUs';

function Landing() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    dispatch(logout());
  };
  return (

      <div className="flex flex-col items-center space-y-10">
          {isLoggedIn && user ? (
              <div className="flex flex-col text-center">
                  <div>Hi</div>
                  {' '}
                  <div>
                      {user.username}
                      !
                  </div>
                  <button type="button" onClick={handleLogout}>
                      Logout
                  </button>
              </div>
      ) : <JoinUs />}
      </div>
  );
}
export default Landing;
