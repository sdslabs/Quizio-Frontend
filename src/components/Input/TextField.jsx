import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({
 id, label, placeholder, error, limit, val, setVal, onKeyDown, additionalClassName,
}) => {
  const [currentLen, setCurrentLen] = useState(0);

  const handleChange = (e) => {
    const newVal = e.target.value;
    if (newVal.length <= limit - 1 || limit === 0) {
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
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            id={id}
            className={`mt-1 p-4 border border-${
          error ? 'red-error' : 'grey-N4'
        } rounded ${additionalClassName}
          w-full text-sm placeholder-grey-N4::placeholder
          focus:outline-none focus:border-purple`}
          />
          {error && (
          <span className="text-sm text-red-error absolute right-0 top-0">
              {error}
          </span>
      )}
          {limit !== 0 && (
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
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  limit: PropTypes.number,
  val: PropTypes.string.isRequired,
  setVal: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  additionalClassName: PropTypes.string,
};

TextField.defaultProps = {
  error: '',
  label: '',
  limit: 0,
  onKeyDown: () => {},
  additionalClassName: 'bg-white',
};

export default TextField;
