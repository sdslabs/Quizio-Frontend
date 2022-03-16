import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import '@pagestyles/check_quiz/index.scss';
import Top from '@pages/CheckQuiz/ResponseList/Top';
import Bottom from '@components/pages/CheckQuiz/ResponseList/Bottom';

const ResponseList = () => (
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

export default ResponseList;
