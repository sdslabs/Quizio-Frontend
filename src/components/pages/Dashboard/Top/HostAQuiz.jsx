import React from 'react';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import '@pagestyles/dashboard/not_registered.scss';

const HostAQuiz = () => {
  const handleHostQuiz = () => {};

  return (
      <div className="not-registered-container">
          <div className="not-registered-title">Host a Quiz</div>
          <div className="not-registered-content">No quizzes scheduled, why don&apos;t you host one</div>
          <div className="not-registered-button">
              <PrimaryCTA text="Host Quiz" onClick={handleHostQuiz} />
          </div>
      </div>
  );
};
export default HostAQuiz;
