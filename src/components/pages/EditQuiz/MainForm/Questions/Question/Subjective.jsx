import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';
import MarkdownTextField from '@components/Input/MarkdownTextField';

const Subjective = ({ checkerNotes, setCheckersNotes, marks, setMarks }) => (
  <div className='subjective-render'>
    <hr className='rounded' color='grey' />
    <div className='question-marks'>
      <div className='marks-text flex flex-row basis-1/2'>
        <div className='pt-8 pr-4'>Marks:</div>
        <TextField id='question-marks' placeholder='0' setVal={setMarks} val={marks.toString()} />
      </div>
    </div>
    <div className='checkers-notes pt-5'>
      <span className='text-grey pl-4'>Checker&apos;s Notes</span>
      <MarkdownTextField
        id='checkers-notes'
        val={checkerNotes || ''}
        placeholder="Enter checker's notes here"
        setVal={setCheckersNotes}
      />
    </div>
  </div>
)

Subjective.propTypes = {
  checkerNotes: PropTypes.string,
  setCheckersNotes: PropTypes.func,
  marks: PropTypes.string,
  setMarks: PropTypes.func,
};

Subjective.defaultProps = {
  checkerNotes: '',
  setCheckersNotes: () => {},
  marks: '0',
  setMarks: () => {},
};

export default Subjective;
