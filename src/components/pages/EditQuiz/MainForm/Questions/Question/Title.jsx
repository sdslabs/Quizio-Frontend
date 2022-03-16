import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ activeQuestion }) => (
    <div className="question-title mt-6 mb-6 contentEditable">
        Question
        {' '}
        {activeQuestion + 1}
    </div>
  );

Title.propTypes = {
	activeQuestion: PropTypes.number,
};

Title.defaultProps = {
	activeQuestion: 0,
};

export default Title;
