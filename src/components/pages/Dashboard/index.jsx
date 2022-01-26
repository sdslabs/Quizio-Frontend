import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import Top from './Top';
import Bottom from './Bottom';
import '@pagestyles/dashboard/index.scss';

const Dashboard = () => (
    <div className="dashboard">
        <Navbar type="dashboard" />
        <div className="top">
            <Top />
        </div>
        <div className="main">
            <Bottom />
        </div>
    </div>
);

export default Dashboard;
