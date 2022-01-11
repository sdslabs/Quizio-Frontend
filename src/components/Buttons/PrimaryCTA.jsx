import React from 'react';
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';

const PrimaryCTA = ({ text, onClick }) => (
    <button type="button" className="primary-cta-button" onClick={onClick}>
        {text}
    </button>
);
PrimaryCTA.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

PrimaryCTA.defaultProps = {
  onClick: () => {},
  text: 'Primary CTA',
};

export default PrimaryCTA;
