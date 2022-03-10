import React from 'react';
import PropTypes from 'prop-types';

const DateTimeField = ({
  id,
  label,
  placeholder,
  error,
  val,
  onChange,
  onKeyDown,
  additionalClassName,
  disabled,
  pattern,
  type,
}) => (
    <div className="relative pt-5 w-full">
        <label htmlFor={id} className="absolute top-0 text-sm text-grey-N6">
            {label}
        </label>
        <input
          type={type}
          value={val}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          id={id}
          disabled={disabled}
          pattern={pattern}
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
    </div>
  );

DateTimeField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  val: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func,
  additionalClassName: PropTypes.string,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

DateTimeField.defaultProps = {
  error: '',
  label: '',
  onKeyDown: () => {},
  onChange: () => {},
  additionalClassName: 'bg-white',
  disabled: false,
  pattern: '',
  type: 'date',
};

export default DateTimeField;
