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
}) => (
    <>
        {questionType === 'subjective' ? (
            <Subjective
              marks={marks.toString()}
              setMarks={setMarks}
              checkerNotes={checkerNotes}
              setCheckersNotes={setCheckersNotes}
            />
    ) : (
        <MCQ
          choices={choices}
          setChoices={setChoices}
          marks={marks.toString()}
          setMarks={setMarks}
          checkerNotes={checkerNotes}
          setCheckersNotes={setCheckersNotes}
        />
    )}
    </>
);

QuestionInputArea.propTypes = {
  questionType: PropTypes.string,
  marks: PropTypes.string,
  setMarks: PropTypes.func,
  checkerNotes: PropTypes.string,
  setCheckersNotes: PropTypes.func,
  choices: PropTypes.array,
  setChoices: PropTypes.func,
};

QuestionInputArea.defaultProps = {
  questionType: 'mcq',
  marks: '0',
  setMarks: () => {},
  checkerNotes: '',
  setCheckersNotes: () => {},
  choices: [],
  setChoices: () => {},
};

export default QuestionInputArea;
