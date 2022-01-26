import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import '@styles/common/navbar.scss';

const Navbar = ({ type }) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const [profilePic, setProfilePic] = useState('');

  const handleHostQuiz = () => {
    history.push('/quiz/create');
  };

  useEffect(() => {
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
              <div className="logo">Quizio</div>
          </div>
          {type === 'dashboard' && user && (
          <div className="right">
              <div className="host-quiz">
                  <PrimaryCTA text="+ Host Quiz" onClick={handleHostQuiz} />
              </div>
              <div className="profile-pic">
                  <img className="profile-pic-img" src={profilePic} alt="" />
              </div>
          </div>
      )}
      </div>
  );
};
Navbar.propTypes = {
  type: PropTypes.string,
};

Navbar.defaultProps = {
  type: '',
};
export default Navbar;
