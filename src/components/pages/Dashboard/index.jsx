import React from 'react';
import '@pagestyles/dashboard/index.scss';
import Navbar from '@components/Navbar/Navbar';

const Dashboard = () => {
const a = 1;

return (
    <div className="dashboard">
        <Navbar />
        {a}
    </div>
);
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
