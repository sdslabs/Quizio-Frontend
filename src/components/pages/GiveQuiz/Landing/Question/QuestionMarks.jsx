/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import log from '@utils/log';

const QuestionMarks = ({ questionData }) => {
  log({ marks: questionData.marks || 'undisclosed' });
  return (
      <p className="text-purple-V6 font-semibold">
          Marks :
          {' '}
          {questionData.marks || 'undisclosed'}
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
