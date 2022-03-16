import React, { useState } from 'react';
import '@pagestyles/check_quiz/checking_table.scss';
import PropTypes from 'prop-types';
import ProgressBar from '@components/pages/CheckQuiz/ResponseList/Bottom/ProgressBar';
import { Link } from 'react-router-dom';

const MAX_PAGE_SIZE = 10;

const parseTableData = (data, pageNum, quizID) => data
    .filter(
      (val, index) => index >= MAX_PAGE_SIZE * pageNum
        && index < MAX_PAGE_SIZE * (pageNum + 1),
    )
    .map((participant) => (
        <tr key={participant.sr_num}>
            <td className="text-left table-content">{participant.sr_num}</td>
            <td className="text-left table-content table-link">
                {participant.name}
            </td>
            <td className="text-center table-content">{participant.rank}</td>
            <td className="text-center table-content">{participant.marks}</td>
            <td className="text-center table-content">
                <ProgressBar progress={participant.progress} />
            </td>
            <td className="text-center table-content table-link">
                <Link to={`/quiz/check/${quizID}/${participant.participantID}`}>
                    Check Quiz
                </Link>
            </td>
        </tr>
    ));

const CheckingTable = ({ data, quizID }) => {
  const [pageNum, setPageNum] = useState(0);
  const incrementPageNum = () => {
    if ((pageNum + 1) * MAX_PAGE_SIZE < data.length) {
      setPageNum(pageNum + 1);
    }
  };
  const decrementPageNum = () => {
    if (pageNum > 0) setPageNum(pageNum - 1);
  };
  return (
      <div className="checking-table-container">
          <table>
              <tbody>
                  <tr>
                      <th className="text-left table-content">Sr.</th>
                      <th className="text-left table-content">Name</th>
                      <th className="table-content">Current rank</th>
                      <th className="table-content">Current marks</th>
                      <th className="table-content">Checking progress</th>
                      <th className="table-content">Check quiz</th>
                  </tr>
                  {parseTableData(data, pageNum, quizID)}
              </tbody>
          </table>
          <div className="page-cta-flex">
              <span
                role="button"
                tabIndex={0}
                className="page-cta"
                onClick={decrementPageNum}
              >
                  Previous
              </span>
              <span
                role="button"
                tabIndex={0}
                className="page-cta"
                onClick={incrementPageNum}
              >
                  Next
              </span>
          </div>
      </div>
  );
};

CheckingTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  quizID: PropTypes.string.isRequired,
};

export default CheckingTable;
