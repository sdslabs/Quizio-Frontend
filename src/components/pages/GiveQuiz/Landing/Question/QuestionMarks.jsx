/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const QuestionMarks = ({ questionData }) => {
  const getQuestionMarks = () => {
    if (questionData) {
      if (questionData.type === 'mcq') {
        return questionData?.choices.find((c) => c.marks !== 0).marks;
      }
      return questionData.maxMarks;
    }
    return null;
  };

  return (
      <p className="text-purple-V6 font-semibold">
          Marks :
          {' '}
          {getQuestionMarks()}
      </p>
  );
};

QuestionMarks.propTypes = {
  questionData: PropTypes.object,
};

QuestionMarks.defaultProps = {
  questionData: {},
};

export default QuestionMarks;
