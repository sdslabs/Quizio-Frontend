import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';

const AccessCodeInput = ({ accessCode, setAccessCode }) => (
    <div className="quiz-details-access">
        <TextField
          id="Access Code"
          placeholder="Enter quiz access code"
          label="Access Code"
          error=""
          limit={6}
          val={accessCode}
          setVal={setAccessCode}
        />
    </div>
);

AccessCodeInput.propTypes = {
  accessCode: PropTypes.string,
  setAccessCode: PropTypes.func,
};

AccessCodeInput.defaultProps = {
  accessCode: '',
  setAccessCode: () => {},
};

export default AccessCodeInput;
