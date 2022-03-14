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
                        setMcqCount={setMcqCount}
                        setChoices={setChoices}
                        mcqCount={mcqCount}
                        choices={choices}
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
  setSelected: PropTypes.func.isRequired,
  setMcqCount: PropTypes.func,
  mcqCount: PropTypes.number,
  editable: PropTypes.bool,
  setChoices: PropTypes.func,
};

RadioGroup.defaultProps = {
  selected: '',
  setChoices: () => {},
  setMcqCount: () => {},
  editable: false,
  mcqCount: 0,
};
export default RadioGroup;
