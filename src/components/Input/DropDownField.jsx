import React from 'react';
import PropTypes from 'prop-types';

const DropDownField = ({
 id, label, val, setVal, dropDownOptions,
}) => {
  const handleChange = (e) => {
    setVal(e.target.value);
  };

  const options = [];
  dropDownOptions.forEach((option) => {
    options.push(<option value={option}>{option}</option>);
  });

  return (
      <div className="relative pt-5 w-full">
          <label htmlFor={id} className="absolute top-0 text-sm text-grey-N6">
              {label}
          </label>
          <select
            value={val}
            onChange={handleChange}
            className={`mt-1 p-4 border border-grey-N4
              w-full text-sm focus:outline-none rounded focus:border-purple bg-white`}
          >
              {options}
          </select>
      </div>
  );
};

DropDownField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  val: PropTypes.string.isRequired,
  setVal: PropTypes.func.isRequired,
  dropDownOptions: PropTypes.shape([]).isRequired,
};

DropDownField.defaultProps = {
  label: '',
};

export default DropDownField;
