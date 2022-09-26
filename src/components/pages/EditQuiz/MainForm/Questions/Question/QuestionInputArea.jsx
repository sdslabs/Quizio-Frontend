/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Subjective from './Subjective';
import MCQ from './MCQ';

const QuestionInputArea = ({
  questionType,
  marks,
  setMarks,
  checkerNotes,
  setCheckersNotes,
  choices,
  setChoices,
  marksError,
  choicesError,
}) => (
    <>
        {questionType === 'subjective' ? (
            <Subjective
              marks={marks.toString()}
              setMarks={setMarks}
              checkerNotes={checkerNotes}
              setCheckersNotes={setCheckersNotes}
              marksError={marksError}
            />
    ) : (
        <MCQ
          choices={choices}
          setChoices={setChoices}
          marks={marks.toString()}
          setMarks={setMarks}
          checkerNotes={checkerNotes}
          setCheckersNotes={setCheckersNotes}
          marksError={marksError}
          choicesError={choicesError}
        />
    )}
    </>
);

QuestionInputArea.propTypes = {
  questionType: PropTypes.string,
  marksError: PropTypes.string,
  marks: PropTypes.string,
  setMarks: PropTypes.func,
  checkerNotes: PropTypes.string,
  setCheckersNotes: PropTypes.func,
  choices: PropTypes.array,
  setChoices: PropTypes.func,
  choicesError: PropTypes.string,
};

QuestionInputArea.defaultProps = {
  questionType: 'mcq',
  marksError: '',
  marks: '0',
  setMarks: () => { },
  checkerNotes: '',
  setCheckersNotes: () => { },
  choices: [],
  setChoices: () => { },
  choicesError: '',
};

export default QuestionInputArea;
