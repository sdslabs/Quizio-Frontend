import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import SideNav from './SideNav';
import QuizBanner from './QuizBanner';

const GiveQuiz = () => (
    <>
        <Navbar />
        <div className="mt-14 fixed top-0 flex w-screen">
            <SideNav />
            <div className="flex-grow">
                <QuizBanner />
            </div>
        </div>
    </>
    );

export default GiveQuiz;
