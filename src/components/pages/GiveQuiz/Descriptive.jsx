/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import TextField from '@components/Input/TextField';

const Descriptive = ({ questionText, answer, setAnswer }) => (
    <div>
        <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
        <TextField
          id="DescriptiveAnswer"
          placeholder=""
          val={answer}
          setVal={setAnswer}
        />
    </div>
);

Descriptive.propTypes = {
questionText: PropTypes.string,
answer: PropTypes.string.isRequired,
setAnswer: PropTypes.func.isRequired,
};

Descriptive.defaultProps = {
questionText: '',
};

export default Descriptive;
