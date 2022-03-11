import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';

const QuizNameInput = ({ quizName, setQuizName }) => (
    <div className="quiz-details-name">
        <TextField
          id="quiz name"
          placeholder="Enter quiz name"
          label="Quiz Name"
          error=""
          limit={20}
          val={quizName}
          setVal={setQuizName}
        />
    </div>
);

QuizNameInput.propTypes = {
  quizName: PropTypes.string,
  setQuizName: PropTypes.func,
};

QuizNameInput.defaultProps = {
  quizName: '',
  setQuizName: () => {},
};

export default QuizNameInput;
