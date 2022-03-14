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
};

QuestionInputArea.defaultProps = {
  questionType: 'mcq',
  marks: '0',
  setMarks: () => {},
  checkerNotes: '',
  setCheckersNotes: () => {},
};

export default QuestionInputArea;
