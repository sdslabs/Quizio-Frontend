import React, {} from 'react';
import '@pagestyles/check_quiz/top.scss';

const Top = () => (
    <div className="dashboard-top">
        <div className="quiz-details-container">
            <div className="quiz-details-title">Maths Quiz</div>
            <div className="quiz-details-content">Scheduled on 6th October, 2021, 12:33 AM</div>
            <div className="quiz-details-content">
                Created by:
                {' '}
                <span className="content-link">Angad Kambli</span>
            </div>
            <div className="quiz-details-content">
                Result published by:
                {' '}
                <span className="content-link">Angad Kambli</span>
                , 10th February, 2022, XX:XX PM
            </div>
        </div>
        <div className="participants-container">
            <div className="participants-count">1000</div>
            <div className="participants-text">Total</div>
            <div className="participants-text"> Participants</div>
        </div>
        <div className="checks-container">
            <div className="checks-count">1000</div>
            <div className="checks-text">Checks</div>
            <div className="checks-text">Completed</div>
        </div>
    </div>
  );

export default Top;
