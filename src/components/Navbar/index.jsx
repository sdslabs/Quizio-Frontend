import React from 'react';
// import { Logout } from '@api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@redux/actions/auth';
import Cookies from 'js-cookie';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    dispatch(logout());
  };

  return (
      <div className="flex items-center justify-between bg-green h-12 w-screen ">
          <div className="font-bold text-xl text-yellow-1 pl-6">Quizio</div>
          <div className="text-yellow-1 pr-6">
              Welcome
              {' '}
              {user.username}
              !
              <button type="button" onClick={handleLogout}>Logout!</button>
          </div>
      </div>
  );
};

Navbar.propTypes = {};

Navbar.defaultProps = {};
export default Navbar;
