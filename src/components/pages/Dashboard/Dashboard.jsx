import React from 'react';
import Navbar from '@components/Navbar';
import Status from './Status';
import Bottom from './MyQuizzes';
import '@pagestyles/dashboard/index.scss';

const Dashboard = () => (
    <div className="dashboard">
        <Navbar type="dashboard" />
        <div className="top">
            <Status />
        </div>
        <div className="bottom">
            <Bottom />
        </div>
    </div>
);

export default Dashboard;
