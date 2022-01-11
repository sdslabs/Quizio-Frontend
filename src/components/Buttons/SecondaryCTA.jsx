import React from 'react';
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';

const SecondaryCTA = ({ text, onClick }) => (
    <button type="button" className="secondary-cta-button" onClick={onClick}>
        {text}
    </button>
);
SecondaryCTA.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

SecondaryCTA.defaultProps = {
  onClick: () => {},
  text: 'Primary CTA',
};

export default SecondaryCTA;
