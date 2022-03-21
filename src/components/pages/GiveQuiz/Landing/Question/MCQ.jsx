import React from 'react';
import { PropTypes } from 'prop-types';
import RadioButton from '@components/Input/RadioGroup/RadioButton';

const MCQ = ({
 questionText, options, selected, setChoice,
}) => {
  const handleChange = (e) => setChoice(e.target.value);

  return (
      <div>
          <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
          {options.map((choice) => (
              <div key={choice.quizioID}>
                  <RadioButton
                    text={choice.choice}
                    onChange={handleChange}
                    checked={selected === choice.quizioID}
                    quizioID={choice.quizioID}
                  />
              </div>
      ))}
      </div>
  );
};

MCQ.propTypes = {
  questionText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.string,
  setChoice: PropTypes.func.isRequired,
};

MCQ.defaultProps = {
  selected: '',
};

export default MCQ;
