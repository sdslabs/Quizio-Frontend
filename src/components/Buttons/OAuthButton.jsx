import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as GithubLogo } from '@icons/GithubLogo.svg';
import { ReactComponent as GoogleIcon } from '@icons/GoogleIcon.svg';
import { ReactComponent as ArrowRight } from '@icons/ArrowRight.svg';
import '@styles/base/buttons.scss';

const OAuthButton = ({ label, id, additionalClassName }) => {
  const [isHover, setIsHover] = useState(false);
  const handleHoverStart = () => setIsHover(true);
  const handleHoverEnd = () => setIsHover(false);

  return (
      <div
        className="o-auth-button-div"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
          {id === 'github' && <GithubLogo size={28} />}
          {id === 'google' && <GoogleIcon size={28} />}
          <button type="button" className={`o-auth-button ${additionalClassName} `}>
              {label}
          </button>
          {isHover ? <ArrowRight /> : <div className="w-5" />}
      </div>
  );
};
OAuthButton.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  additionalClassName: PropTypes.string,
};

OAuthButton.defaultProps = {
  additionalClassName: '',
};

export default OAuthButton;
