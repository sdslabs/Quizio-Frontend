import { getAllQuizzes } from '@api/quizzes/quizzesFetcher';
import React, { useEffect, useState } from 'react';

const Quizzes = () => {
  const [onGoingQuizzes, setOnGoingQuizzes] = useState([]);
  const [upComingQuizzes, setUpcomingQuizzes] = useState([]);

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
    console.log({ onGoingQuizzes });
  }, [onGoingQuizzes]);

  useEffect(() => {
    console.log({ upComingQuizzes });
  }, [upComingQuizzes]);

  return (
      <div>
          <div className="ongoing-quizzes">
              <div className="title">Ongoing Quizzes</div>
          </div>

          <div className="upcoming-quizzes">
              <div className="title">Upcoming Quizzes</div>
          </div>
      </div>
  );
};
export default Quizzes;
