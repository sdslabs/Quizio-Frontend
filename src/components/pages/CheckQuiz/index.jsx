import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import '@pagestyles/check_quiz/index.scss';
import Top from '@pages/CheckQuiz/Top';
import Bottom from '@pages/CheckQuiz/Bottom';

const CheckQuiz = () => (
    <div className="check-quiz">
        <Navbar type="dashboard" />
        <div className="top">
            <Top />
        </div>
        <div className="bottom">
            <Bottom />
        </div>
    </div>
    );

export default CheckQuiz;
