import React from 'react';
import { PropTypes } from 'prop-types';
import TextField from '@components/Input/TextField';

const Subjective = ({ questionText, answer, setAnswer }) => (
    <div>
        <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
        <TextField
          id="DescriptiveAnswer"
          placeholder="Your answer here"
          val={answer}
          setVal={setAnswer}
        />
    </div>
);

Subjective.propTypes = {
  questionText: PropTypes.string,
  answer: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired,
};

Subjective.defaultProps = {
  questionText: '',
};

export default Subjective;
