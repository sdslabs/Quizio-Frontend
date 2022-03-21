import React from 'react';
import PropTypes from 'prop-types';

const ClearResponses = ({ setAnswer, setChoice }) => {
  const handleClear = () => {
    setAnswer('');
    setChoice(null);
  };

  return (
      <div className="flex flex-row justify-end mt-8">
          <button
            className="w-100 text-purple cursor-pointer"
            onClick={handleClear}
            type="button"
          >
              Clear Responses
          </button>
      </div>
  );
};

ClearResponses.propTypes = {
  setAnswer: PropTypes.func.isRequired,
  setChoice: PropTypes.func.isRequired,
};

export default ClearResponses;
