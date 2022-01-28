import React from 'react';
import PropTypes from 'prop-types';

const CreatedQuiz = ({ data }) => (
    <div className="created-quiz">
        {data.quizioID}
    </div>
	);

CreatedQuiz.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	data: PropTypes.any.isRequired,
};

export default CreatedQuiz;
