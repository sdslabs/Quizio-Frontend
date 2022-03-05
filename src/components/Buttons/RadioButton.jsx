import React from 'react';
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';

const RadioButton = ({ text, onChange, quizioId }) => (
    <div className="radio-button">
        <input
          type="radio"
          name="radioInput"
          className="radio-button-input"
          id={quizioId}
          onChange={onChange()}
          checked={console.log('kitty-kat')}
        />
        <label htmlFor={quizioId} className="radio-button-label">
            {text}
        </label>
    </div>
    );
    RadioButton.propTypes = {
        text: PropTypes.string,
        onChange: PropTypes.func,
        quizioId: PropTypes.string,
    };

    RadioButton.defaultProps = {
        onChange: () => {},
        text: 'Option 1',
        quizioId: 'radio',
    };

export default RadioButton;

// kitty-kat and manly-man were here working on this button
