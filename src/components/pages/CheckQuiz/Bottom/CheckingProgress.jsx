import React, {} from 'react';
import PropTypes from 'prop-types';
import '@pagestyles/check_quiz/checking_progress.scss';

const CheckingProgress = ({ progress }) => {
  if (progress === 0) {
    return (
        <div className="progress-not-started">
            NOT STARTED
        </div>
    );
  }
  if (progress === 100) {
    return (
        <div className="progress-completed">
            COMPLETED
        </div>
    );
  }
  const progressStr = `${progress.toString()}%`;
  return (
      <div className="progress-container">
          <div className="progress-base">
              <div className="progress-done" style={{ width: progressStr }} />
          </div>
          <div className="progress-text">{progressStr}</div>
      </div>
  );
};

CheckingProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default CheckingProgress;
