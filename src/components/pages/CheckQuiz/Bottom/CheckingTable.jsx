import React, {} from 'react';
import PropTypes from 'prop-types';
import '@pagestyles/check_quiz/checking_table.scss';

const CheckingTable = () => (
    <div className="checking-table-container">
        <table>
            <th className="text-left table-content">Sr.</th>
            <th className="text-left table-content">Name</th>
            <th className="table-content">Current rank</th>
            <th className="table-content">Current marks</th>
            <th className="table-content">Checking progress</th>
            <th className="table-content">Check quiz</th>
            <tr>
                <td className="text-left table-content">1</td>
                <td className="text-left table-content table-link">Angad</td>
                <td className="text-center table-content">69</td>
                <td className="text-center table-content">96</td>
                <td className="text-center table-content">69420</td>
                <td className="text-center table-content table-link">Check Quiz</td>
            </tr>
            <tr>
                <td className="text-left table-content">1</td>
                <td className="text-left table-content table-link">Angad</td>
                <td className="text-center table-content">69</td>
                <td className="text-center table-content">96</td>
                <td className="text-center table-content"><CheckingProgress progress={10} /></td>
                <td className="text-center table-content table-link">Check Quiz</td>
            </tr>
        </table>
    </div>
);

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
          <div className="progress-text">90%</div>
      </div>
  );
};

CheckingProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default CheckingTable;
