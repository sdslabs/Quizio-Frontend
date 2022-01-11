/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({
 id, label, placeholder, error, inputProps, limit,
}) => {
  const [val, setVal] = useState('');
  const [currentLen, setCurrentLen] = useState(0);

  const handleChange = (e) => {
    const newVal = e.target.value;
    if (currentLen < limit) {
      setVal(newVal);
    }
    setCurrentLen(newVal.length);
  };

  return (
      <div className="relative pt-5 w-full">
          <label htmlFor={id} className="absolute top-0 text-sm text-grey-N6">
              {label}
          </label>
          <input
            value={val}
            onChange={handleChange}
            placeholder={placeholder}
            id={id}
            {...inputProps}
            className={`mt-1 p-4 border border-${
          error ? 'red-error' : 'grey-N4'
        } rounded
          w-full text-sm placeholder-grey-N4::placeholder
          focus:outline-none focus:border-purple`}
          />
          {error && (
          <span className="text-sm text-red-error absolute right-0 top-0">
              {error}
          </span>
      )}
          {limit && (
          <div className="flex w-full justify-end text-sm text-grey-N6">
              {currentLen}
              /
              {limit}
          </div>
      )}
      </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  inputProps: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    pattern: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  limit: PropTypes.number,
};

TextField.defaultProps = {
  error: '',
  limit: 0,
  inputProps: {},
};

export default TextField;
