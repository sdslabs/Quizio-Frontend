import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';

const QuizDescription = ({ quizDesc, setQuizDesc }) => (
    <div className="quiz-details-description">
        <TextField
          id="Quiz Description"
          placeholder="Enter a quiz description"
          label="Quiz Description"
          error=""
          limit={150}
          val={quizDesc}
          setVal={setQuizDesc}
        />
    </div>
);

QuizDescription.propTypes = {
  quizDesc: PropTypes.string,
  setQuizDesc: PropTypes.func,
};

QuizDescription.defaultProps = {
  quizDesc: '',
  setQuizDesc: () => {},
};

export default QuizDescription;
