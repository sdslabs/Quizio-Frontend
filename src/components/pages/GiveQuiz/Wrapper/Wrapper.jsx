import React from 'react';
import { PropTypes } from 'prop-types';
import Navbar from '@components/Navbar/Navbar';
import SideNav from '../SideNav';
import QuizBanner from './QuizBanner';

const Wrapper = ({ children }) => (
    <div className="w-screen flex flex-col">
        <Navbar type="attempt-quiz" />
        <div className="mt-14 fixed top-0 flex w-screen h-screen">
            <SideNav />
            <div className="flex-grow ml-72 overflow-y-auto">
                <QuizBanner />
                <div className="mt-14 px-20 mb-36 mx-auto container">{children}</div>
            </div>
        </div>
    </div>
);

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Wrapper;
