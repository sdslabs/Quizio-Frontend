import React from 'react';
import PropTypes from 'prop-types';
// import { AiOutlineArrowRight } from 'react-icons/ai';
// import { BsGithub } from 'react-icons/bs';
import { ReactComponent as GoogleIcon } from '@icons/GoogleIcon.svg';
import '@styles/base/buttons.scss';

const OAuthButton = ({ label, id, additionalClassName }) => (
    <div className="o-auth-button-div">
        {/* {id === 'github' ? <BsGithub className="o-auth-icon" size={28} /> : <></>} */}
        {id === 'google' ? <GoogleIcon size={28} /> : <></>}
        <button type="button" className={`o-auth-button ${additionalClassName} `}>
            {label}
        </button>
        {/* <AiOutlineArrowRight className="o-auth-arrow-icon" /> */}
    </div>
);
OAuthButton.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  additionalClassName: PropTypes.string,
};

OAuthButton.defaultProps = {
  additionalClassName: '',
};

export default OAuthButton;
