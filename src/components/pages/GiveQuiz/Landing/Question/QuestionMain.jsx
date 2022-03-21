/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MCQ from './MCQ';
import Subjective from './Subjective';

const QuestionMain = ({
  questionData,
  choice,
  setChoice,
  answer,
  setAnswer,
}) => (
    <>
        {questionData.type === 'mcq' ? (
            <MCQ
              questionText={questionData.question}
              options={questionData.choices}
              selected={choice}
              setChoice={setChoice}
            />
    ) : (
        <Subjective
          questionText={questionData.question}
          answer={answer}
          setAnswer={setAnswer}
        />
    )}
    </>
);

QuestionMain.propTypes = {
  questionData: PropTypes.object,
  choice: PropTypes.string,
  setChoice: PropTypes.func,
  answer: PropTypes.string,
  setAnswer: PropTypes.func,
};

QuestionMain.defaultProps = {
  questionData: {},
  choice: null,
  setChoice: () => {},
  answer: '',
  setAnswer: () => {},
};

export default QuestionMain;
