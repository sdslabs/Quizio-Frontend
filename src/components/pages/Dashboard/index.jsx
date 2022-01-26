import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import Top from './Top';
import '@pagestyles/dashboard/index.scss';

const Dashboard = () => {
const a = 1;

return (
    <div className="dashboard">
        <Navbar type="dashboard" />
        <div className="top">
            <Top />
        </div>
        <div className="main">
            quizzes
            {a}
        </div>
    </div>
);
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
