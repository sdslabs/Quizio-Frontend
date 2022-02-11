import React, {} from 'react';
import '@pagestyles/check_quiz/bottom.scss';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import CheckingTable from './CheckingTable';

const Bottom = () => (
    <div className="dashboard-bottom">
        <div className="actionables">
            <div>
                Sort by :
                {' '}
                <select className="dropdown">
                    <option>Checked (0 - 100%)</option>
                    <option>B</option>
                </select>
            </div>
            <div className="cta-flex">
                <SecondaryCTA text="Autocheck" />
                <PrimaryCTA text="Publish Results" additionalClassName="quiz-check-button" />
            </div>
        </div>
        <CheckingTable />
    </div>
  );

export default Bottom;
