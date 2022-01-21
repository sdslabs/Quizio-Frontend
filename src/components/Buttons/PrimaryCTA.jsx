import React from 'react';
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';

const PrimaryCTA = ({ text, onClick, additionalClassName }) => (
    <button type="button" className={`primary-cta-button ${additionalClassName} `} onClick={onClick}>
        {text}
    </button>
);
PrimaryCTA.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  additionalClassName: PropTypes.string,
};

PrimaryCTA.defaultProps = {
  onClick: () => {},
  text: 'Primary CTA',
  additionalClassName: '',
};

export default PrimaryCTA;
