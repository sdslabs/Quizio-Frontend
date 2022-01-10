/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
 id, label, error, inputProps,
}) => (
    <div className="relative pt-5 w-full">
        <label htmlFor={id} className="absolute top-0 text-sm text-grey-N6">
            {label}
        </label>
        <input
          id={id}
          {...inputProps}
          className={`p-4 border border-${error ? 'red-error' : 'grey-N4'} rounded
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

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  inputProps: PropTypes.shape({
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    pattern: PropTypes.string,
    disabled: PropTypes.bool,
  }).isRequired,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
