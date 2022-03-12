/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';
import EditableRadioButton from './EditableRadioButton';

const RadioGroup = ({
 choices, setChoices, selected, setSelected, editable,
}) => {
  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
      <div className="w-full flex flex-col">
          {choices.map((choice) => (
              <div key={choice.quizioID}>
                  {editable ? (
                      <EditableRadioButton
                        text={choice.choice}
                        quizioID={choice.quizioID}
                        onChange={() => {}}
                        setChoices={setChoices}
                        choices={choices}
                      />
)
                      : (
                          <RadioButton
                            text={choice.choice}
                            onChange={(e) => handleChange(e)}
                            checked={selected === choice.quizioID}
                            quizioID={choice.quizioID}
                          />
)}

              </div>
      ))}
      </div>
  );
};

RadioGroup.propTypes = {
  choices: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  setChoices: PropTypes.func,
};

RadioGroup.defaultProps = {
  setChoices: () => {},
  editable: false,
};
export default RadioGroup;
