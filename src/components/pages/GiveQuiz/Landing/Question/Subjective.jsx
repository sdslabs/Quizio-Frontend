import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';
import ReactMarkdown from 'react-markdown';

const Subjective = ({ questionText, answer, setAnswer }) => (
    <div>
        {/* <div className="bg-purple-V1 p-2 my-2">{questionText}</div> */}
        {/* eslint-disable-next-line react/no-children-prop */}
        <div className="bg-purple-V1 p-2 my-2">
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={questionText} escapeHtml={false} />
        </div>
        <TextField
          id="DescriptiveAnswer"
          placeholder="Your answer here"
          val={answer || ''}
          setVal={setAnswer}
        />
    </div>
);

Subjective.propTypes = {
  questionText: PropTypes.string,
  answer: PropTypes.string,
  setAnswer: PropTypes.func.isRequired,
};

Subjective.defaultProps = {
  questionText: '',
  answer: '',
};

export default Subjective;
