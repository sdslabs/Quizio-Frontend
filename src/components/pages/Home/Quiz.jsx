import React from 'react';
import PropTypes from 'prop-types';

const Quiz = ({ quiz }) => (
    <div className="">
        {quiz.description}
    </div>
  );
Quiz.propTypes = {
	quiz: PropTypes.shape({ description: PropTypes.string.isRequired }),
};

Quiz.defaultProps = {
	quiz: PropTypes.shape({ description: PropTypes.string.isRequired }),
};
export default Quiz;
