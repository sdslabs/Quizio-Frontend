import PropTypes from 'prop-types';
import React from 'react';

const JoinUsButton = ({ onClick }) => (
    <div className="flex w-28 h-10 py-2 px-7 bg-yellow-1">
        <button
          type="submit"
          className="font-bold leading-normal text-white-1  "
          onClick={onClick}
        >
            Join Us
        </button>
    </div>
);

JoinUsButton.propTypes = {
  onClick: PropTypes.func,
};

JoinUsButton.defaultProps = {
  onClick: () => {},
};

export default JoinUsButton;
