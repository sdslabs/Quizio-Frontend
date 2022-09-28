import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useGetAllQuizzes } from '@api/quizzes/useQuizzes';
import { useGetCurrentServerTime } from '@api/misc/useTime';
import log from '@utils/log';
import QuizCard from './QuizCard';
import '@pagestyles/dashboard/quizzes.scss';

const Quizzes = () => {
  const {
    data: quizzesData,
    isFetching: isQuizzesFetching,
    isSuccess: isQuizzesSuccess,
    isRefetching: isQuizzesRefetching,
  } = useGetAllQuizzes();

  const {
    data: serverTimeData,
    isSuccess: isServerTimeSuccess,
  } = useGetCurrentServerTime();

  const [onGoingQuizzes, setOnGoingQuizzes] = useState(null);
  const [upComingQuizzes, setUpcomingQuizzes] = useState(null);

  useEffect(async () => {
    if (isQuizzesSuccess && isServerTimeSuccess) {
      const serverTime = dayjs(serverTimeData?.data?.data?.serverTime);

      const upcomingFilter = (quiz) => {
        if (quiz.startTime) {
          const quizStartTime = dayjs(quiz.startTime);
          return quizStartTime > serverTime;
        }
        return true;
      };

      setUpcomingQuizzes(
        quizzesData?.data?.quizzes?.filter(
          (quiz) => quiz.startTime && upcomingFilter(quiz),
        ),
      );

      setOnGoingQuizzes(
        quizzesData?.data?.quizzes?.filter(
          (quiz) => quiz.startTime && !upcomingFilter(quiz),
        ),
      );
    }
  }, [isQuizzesSuccess, isServerTimeSuccess]);

  useEffect(() => {
    log({ onGoingQuizzes }, null, false);
  }, [onGoingQuizzes]);

  useEffect(() => {
    log({ upComingQuizzes }, null, false);
  }, [upComingQuizzes]);

  return (
      <div className="dashboard-quizzes">
          <div className="ongoing-quizzes">
              <div className="title">Ongoing and Past Quizzes</div>
              <div className="quiz-list hide-scrollbar">
                  {isQuizzesFetching && !isQuizzesRefetching && (
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
                  {isQuizzesFetching && !isQuizzesRefetching && (
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
