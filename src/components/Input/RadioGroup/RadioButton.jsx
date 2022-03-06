import React from 'react';
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';

const RadioButton = ({
 text, onChange, quizioID, checked,
}) => (
    <div className="radio-button">
        <input
          type="radio"
          value={quizioID}
          id={quizioID}
          checked={checked}
          onChange={onChange}
          className="radio-button-input"
        />
        <label htmlFor={quizioID} className="radio-button-label">
            {text}
        </label>
    </div>
);

RadioButton.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  quizioID: PropTypes.string,
  checked: PropTypes.bool,
};

RadioButton.defaultProps = {
  onChange: () => {},
  text: 'Radio Button',
  quizioID: '',
  checked: false,
};

export default RadioButton;

// kitty-kat and manly-man were here working on this button
