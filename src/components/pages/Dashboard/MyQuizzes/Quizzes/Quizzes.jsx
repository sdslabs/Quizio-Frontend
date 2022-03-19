import React, { useEffect, useState } from 'react';
// import { getAllQuizzes } from '@api/quizzes/quizzesFetcher';
import { useGetAllQuizzes } from '@api/quizzes/useQuizzes';
import log from '@utils/log';
import QuizCard from './QuizCard';
import '@pagestyles/dashboard/quizzes.scss';

const Quizzes = () => {
  const {
 data, isFetching, isSuccess, isRefetching,
} = useGetAllQuizzes();
  const [onGoingQuizzes, setOnGoingQuizzes] = useState(null);
  const [upComingQuizzes, setUpcomingQuizzes] = useState(null);

  // This will depend on the global state
  useEffect(async () => {
    // const quizRes = await getAllQuizzes();
    if (isSuccess) {
      log({ quizData: data });
    }

    const upcomingFilter = (quiz) => {
      if (quiz.startTime) {
        const quizStartTime = new Date(quiz.startTime);
        return quizStartTime > Date.now();
      }
      // if startTime not set, the quiz is upcoming
      return true;
    };
    setUpcomingQuizzes(
      data?.data?.quizzes?.filter(
        (quiz) => quiz.startTime && upcomingFilter(quiz),
      ),
    );
    setOnGoingQuizzes(
      data?.data?.quizzes?.filter(
        (quiz) => quiz.startTime && !upcomingFilter(quiz),
      ),
    );
  }, [isSuccess]);

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
              <div className="quiz-list hide-scrollbar">
                  {isFetching && !isRefetching && (
                  <div>Fetching ongoing quizzes...</div>
          )}
                  {onGoingQuizzes && onGoingQuizzes.length !== 0 ? (
            onGoingQuizzes.map((quiz) => (
                <div className="quiz-list-item" key={quiz.quizioID}>
                    <QuizCard data={quiz} />
                </div>
            ))
          ) : (
              <div className="ml-5">No upcoming quizzes...</div>
          )}
              </div>
          </div>

          <div className="upcoming-quizzes">
              <div className="title">Upcoming Quizzes</div>
              <div className="quiz-list hide-scrollbar">
                  {isFetching && !isRefetching && (
                  <div>Fetching upcoming quizzes...</div>
          )}
                  {upComingQuizzes && upComingQuizzes.length !== 0 ? (
            upComingQuizzes.map((quiz) => (
                <div className="quiz-list-item" key={quiz.quizioID}>
                    <QuizCard data={quiz} />
                </div>
            ))
          ) : (
              <div className="ml-5">No upcoming quizzes...</div>
          )}
              </div>
          </div>
      </div>
  );
};
export default Quizzes;
