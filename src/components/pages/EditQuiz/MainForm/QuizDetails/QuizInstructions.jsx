import React from 'react';
import PropTypes from 'prop-types';
import MarkdownTextField from '@components/Input/MarkdownTextField';

const QuizInstructions = ({ quizInst, setQuizInst }) => (
    <div className="quiz-details-instructions">
        <div className="text-sm text-grey-N6">Quiz Instructions</div>
        <MarkdownTextField
          id="Quiz instruction"
          placeholder="Enter quiz instruction"
          error=""
          val={quizInst}
          setVal={setQuizInst}
          limit={1500}
        />
    </div>
);

QuizInstructions.propTypes = {
  quizInst: PropTypes.string,
  setQuizInst: PropTypes.func,
};

QuizInstructions.defaultProps = {
  quizInst: '',
  setQuizInst: () => {},
};

export default QuizInstructions;
