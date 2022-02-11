import React, {} from 'react';
import '@pagestyles/check_quiz/checking_table.scss';
import CheckingProgress from './CheckingProgress';

const CheckingTable = () => (
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
                <tr>
                    <td className="text-left table-content">1</td>
                    <td className="text-left table-content table-link">Angad</td>
                    <td className="text-center table-content">69</td>
                    <td className="text-center table-content">96</td>
                    <td className="text-center table-content"><CheckingProgress progress={0} /></td>
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
                <tr>
                    <td className="text-left table-content">1</td>
                    <td className="text-left table-content table-link">Angad</td>
                    <td className="text-center table-content">69</td>
                    <td className="text-center table-content">96</td>
                    <td className="text-center table-content"><CheckingProgress progress={100} /></td>
                    <td className="text-center table-content table-link">Check Quiz</td>
                </tr>
            </tbody>
        </table>
        <div className="page-cta-flex">
            <span className="page-cta">Previous</span>
            <span className="page-cta">Next</span>
        </div>
    </div>
);

export default CheckingTable;
