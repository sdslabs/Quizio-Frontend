import React from 'react';
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';

const PrimaryCTA = ({
 text, onClick, additionalClassName, disabled,
}) => (
    <button disabled={disabled} type="button" className={`primary-cta-button ${additionalClassName}`} onClick={onClick}>
        {text}
    </button>
);

PrimaryCTA.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  additionalClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

PrimaryCTA.defaultProps = {
  onClick: () => {},
  text: 'Primary CTA',
  additionalClassName: '',
  disabled: false,
};

export default PrimaryCTA;
