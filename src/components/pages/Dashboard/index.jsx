import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import '@pagestyles/dashboard/index.scss';

const Dashboard = () => {
const a = 1;

return (
    <div className="dashboard">
        <Navbar type="dashboard" />
        {a}
    </div>
);
};

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;
