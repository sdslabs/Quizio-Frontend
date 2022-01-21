import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import SideNav from '@components/pages/GiveQuiz/SideNav';
import QuizBanner from '@components/pages/GiveQuiz/QuizBanner';
import { PropTypes } from 'prop-types';

const MasterWrapper = ({ children }) => (
    <>
        <Navbar />
        <div className="mt-14 fixed top-0 flex w-screen h-screen">
            <SideNav />
            <div className="flex-grow ml-72 overflow-y-auto">
                <QuizBanner />
                <div className="mt-14 px-20 mb-36 mx-auto container">
                    {children}
                </div>
            </div>
        </div>
    </>
);

MasterWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MasterWrapper;
