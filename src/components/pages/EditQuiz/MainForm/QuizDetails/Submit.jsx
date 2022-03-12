import React from 'react';
import PropTypes from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';

const Submit = ({ handleSubmit }) => (
    <div className="quiz-details-submit-container">
        <div className="quiz-details-submit">
            <PrimaryCTA text="Save &amp; continue" onClick={handleSubmit} />
        </div>
    </div>
);

Submit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Submit;
