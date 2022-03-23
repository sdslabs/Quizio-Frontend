import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';
import '@styles/common/navbar.scss';
import { setUser } from '@redux/actions/auth';

const Navbar = ({ type, handleHostQuiz }) => {
  const user = useSelector((state) => state.auth.user);
  const [profilePic, setProfilePic] = useState('');

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    setUser({});
    window.location.reload(false);
  };

  useEffect(() => {
    log({ user });
    if (user.avatar) {
      setProfilePic(user.avatar);
    } else if (user.googleAvatar) {
      setProfilePic(user.googleAvatar);
    } else if (user.githubAvatar) {
      setProfilePic(user.githubAvatar);
    } else {
      setProfilePic(
        'https://img.apmcdn.org/768cb350c59023919f564341090e3eea4970388c/square/72dd92-20180309-rick-astley.jpg',
      );
    }
  }, [user]);
  return (
      <div className="navbar">
          <div className="left">
              {type === 'attempt-quiz' ? (
                  <span className="logo">Quizio</span>
        ) : (
            <a href="/" className="logo">
                Quizio
            </a>
        )}
          </div>
          {type === 'dashboard' && user && (
          <div className="right">
              {user.role === 'superadmin' && (
              <div className="host-quiz">
                  <PrimaryCTA text="+ Host Quiz" onClick={handleHostQuiz} />
              </div>
          )}
              <div className="profile-pic">
                  <img className="profile-pic-img" src={profilePic} alt="" />
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-purple-V6 font-semibold text-sm leading-5 p-0 pl-4 m-0 text-left;"
              >
                  Logout
              </button>
          </div>
      )}
      </div>
  );
};
Navbar.propTypes = {
  type: PropTypes.string,
  handleHostQuiz: PropTypes.func,
};

Navbar.defaultProps = {
  type: '',
  handleHostQuiz: () => {},
};
export default Navbar;
