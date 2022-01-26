import React, { useEffect, useState } from 'react';
import '@pagestyles/dashboard/top.scss';
import NotRegistered from './NotRegistered';
import QuizStarted from './QuizStarted';
import UpcomingQuiz from './UpcomingQuiz';
import HostAQuiz from './HostAQuiz';

const Top = () => {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [hostedQuizzes, setHostedQuizzes] = useState([]);
  const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [updateCarousel, setUpdateCarousel] = useState(0);
  const [status, setStatus] = useState(false);

  const StatusComponent = () => {
    if (ongoingQuizzes.length !== 0) {
      return <QuizStarted />;
    }

    if (upcomingQuizzes.length !== 0) {
      return <UpcomingQuiz />;
    }

    return status ? <NotRegistered /> : <HostAQuiz />;
  };

  useEffect(() => {
    setAttemptedQuizzes([]);
    setHostedQuizzes([]);
    setOngoingQuizzes([]);
    setUpcomingQuizzes([]);

    const interval = setInterval(() => {
      setUpdateCarousel((t) => t + 1);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setStatus(!status);
  }, [updateCarousel]);

  return (
      <div className="dashboard-top">
          <div className="status-container">{StatusComponent()}</div>
          <div className="attempted-container">
              <div className="attempted-count">{attemptedQuizzes.length}</div>
              <div className="attempted-text">Attempted </div>
              <div className="attempted-text"> Quizzes</div>
          </div>
          <div className="hosted-container">
              <div className="hosted-count">{hostedQuizzes.length}</div>
              <div className="hosted-text">Hosted</div>
              <div className="hosted-text">Quizzes</div>
          </div>
      </div>
  );
};

export default Top;
