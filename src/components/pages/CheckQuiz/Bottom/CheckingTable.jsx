import React, {} from 'react';
import '@pagestyles/check_quiz/checking_table.scss';
import PropTypes from 'prop-types';
import CheckingProgress from './CheckingProgress';

const CheckingTable = ({ data }) => (
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
                {
                        data.map((participant) => (
                            <tr>
                                <td className="text-left table-content">{participant.sr_num}</td>
                                <td className="text-left table-content table-link">{participant.name}</td>
                                <td className="text-center table-content">{participant.rank}</td>
                                <td className="text-center table-content">{participant.marks}</td>
                                <td className="text-center table-content"><CheckingProgress progress={participant.progress} /></td>
                                <td className="text-center table-content table-link">Check Quiz</td>
                            </tr>
                            ))
                    }
            </tbody>
        </table>
        <div className="page-cta-flex">
            <span className="page-cta">Previous</span>
            <span className="page-cta">Next</span>
        </div>
    </div>
);

CheckingTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object,
    ).isRequired,
  };

export default CheckingTable;
