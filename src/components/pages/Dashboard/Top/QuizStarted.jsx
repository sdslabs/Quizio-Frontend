import React from 'react';
import '@pagestyles/dashboard/not_registered.scss';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';

const QuizStarted = () => {
  const handleStartQuiz = () => {};

  return (
      <div className="not-registered-container">
          <div className="not-registered-title">Maths Quiz has Started</div>
          <div className="not-registered-content">All the best!</div>
          <div className="not-registered-button">
              <PrimaryCTA text="Start Quiz" onClick={handleStartQuiz} />
          </div>
      </div>
  );
};
export default QuizStarted;
