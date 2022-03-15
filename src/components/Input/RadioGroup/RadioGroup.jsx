/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';
import EditableRadioButton from './EditableRadioButton';

const RadioGroup = ({
  choices,
  setChoices,
  selected,
  setSelected,
  editable,
  setMcqCount,
  mcqCount,
}) => {
  const handleChange = (e) => {
    console.log('handle change:', e.target.value, choices.find((choice) => choice.quizioID === e.target.value));
    setSelected(e.target.value);
  };

  return (
      <div className="w-full flex flex-col">
          {choices.map((choice) => (
              <div key={choice.quizioID} className={choice.marks.toString() !== '0' ? 'bg-green-1' : ''}>
                  {editable ? (
                      <EditableRadioButton
                        text={choice.choice}
                        quizioID={choice.quizioID}
                        setMcqCount={setMcqCount}
                        setChoices={setChoices}
                        mcqCount={mcqCount}
                        choices={choices}
                        checked={selected === choice.quizioID}
                        onChange={(e) => handleChange(e)}
                      />
          ) : (
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
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  setMcqCount: PropTypes.func,
  mcqCount: PropTypes.number,
  editable: PropTypes.bool,
  setChoices: PropTypes.func,
};

RadioGroup.defaultProps = {
  selected: '',
  setChoices: () => {},
  setMcqCount: () => {},
  setSelected: () => {},
  editable: false,
  mcqCount: 0,
};
export default RadioGroup;
