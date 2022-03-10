import React, { useEffect, useState } from 'react';
import { getAllQuizzes } from '@api/quizzes/quizzesFetcher';
import log from '@utils/log';
import QuizCard from './QuizCard';
import '@pagestyles/dashboard/quizzes.scss';

const Quizzes = () => {
  const [onGoingQuizzes, setOnGoingQuizzes] = useState(null);
  const [upComingQuizzes, setUpcomingQuizzes] = useState(null);

  // This will depend on the global state
  useEffect(async () => {
    const quizRes = await getAllQuizzes();

    const upcomingFilter = (quiz) => {
      if (quiz.startTime) {
        const quizStartTime = new Date(quiz.startTime);
        return quizStartTime > Date.now();
      }
      // if startTime not set, the quiz is upcoming
      return true;
    };
    setUpcomingQuizzes(
      quizRes.data.quizzes.filter((quiz) => upcomingFilter(quiz)),
    );
    setOnGoingQuizzes(
      quizRes.data.quizzes.filter((quiz) => !upcomingFilter(quiz)),
    );
  }, []);

  useEffect(() => {
    log({ onGoingQuizzes });
  }, [onGoingQuizzes]);

  useEffect(() => {
    log({ upComingQuizzes });
  }, [upComingQuizzes]);

  return (
      <div className="dashboard-quizzes">
          <div className="ongoing-quizzes">
              <div className="title">Ongoing Quizzes</div>
              <div className="list">
                  {!onGoingQuizzes && <div>Fetching ongoing quizzes...</div>}
                  {onGoingQuizzes
            && onGoingQuizzes.length !== 0
            && onGoingQuizzes.map((quiz) => (
                <div className="list-item" key={quiz.quizioID}>
                    <QuizCard data={quiz} />
                </div>
            ))}
              </div>
          </div>

          <div className="upcoming-quizzes">
              <div className="title">Upcoming Quizzes</div>
              <div className="list">
                  {!upComingQuizzes && <div>Fetching upcoming quizzes...</div>}
                  {upComingQuizzes
            && upComingQuizzes.length !== 0
            && upComingQuizzes.map((quiz) => (
                <div className="list-item" key={quiz.quizioID}>
                    <QuizCard data={quiz} />
                </div>
            ))}
              </div>
          </div>
      </div>
  );
};
export default Quizzes;
