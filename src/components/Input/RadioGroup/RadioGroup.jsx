/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

const RadioGroup = ({ choices, selected, setSelected }) => {
  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
      <div className="w-full flex flex-col">
          {choices.map((choice) => (
              <div key={choice.quizioID}>
                  <RadioButton
                    text={choice.choice}
                    onChange={(e) => handleChange(e)}
                    checked={selected === choice.quizioID}
                    quizioID={choice.quizioID}
                  />
              </div>
      ))}
      </div>
  );
};

RadioGroup.propTypes = {
  choices: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default RadioGroup;
