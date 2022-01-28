import React from 'react';
import PropTypes from 'prop-types';
import arrowRight from '@icons/arrowRight.svg';
import github from '@icons/githubIcon.svg';
import google from '@icons/googleIcon.svg';
import sdslabs from '@icons/sdslabsIcon.svg';
import '@styles/base/buttons.scss';

const OAuthButton = ({ label, id, additionalClassName }) => (
    <div className="o-auth-button-div">
        {id === 'github' ? <img src={github} alt="github" className="w-9" /> : <></>}
        {id === 'google' ? <img src={google} alt="google" className="w-9" /> : <></>}
        {id === 'sdslabs' ? <img src={sdslabs} alt="sdslabs" className="w-9" /> : <></>}
        <button type="button" className={`o-auth-button ${additionalClassName} `}>
            {label}
        </button>
        <img src={arrowRight} alt="->" className="o-auth-arrow-icon" />
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
