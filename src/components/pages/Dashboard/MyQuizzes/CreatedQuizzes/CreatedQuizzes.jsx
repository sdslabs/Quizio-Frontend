import React, { useEffect, useState } from 'react';
import { useGetQuizzesCreatedByUser } from '@api/quizzes/useQuizzes';
import CreatedQuiz from './CreatedQuiz';
import '@pagestyles/dashboard/created_quizzes.scss';

const CreatedQuizzes = () => {
  const {
    data,
    isFetching,
    isSuccess,
    isRefetching,
  } = useGetQuizzesCreatedByUser();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(async () => {
    if (isSuccess) {
      if (data?.success) {
        setQuizzes(data?.data?.quizzes);
      }
    }
  }, [isSuccess]);

  return (
      <div className="created-quizzes-list">
          {isFetching && !isRefetching ? (
              <div>Fetching created quizzes...</div>
      ) : (
          <>
              {quizzes
            .slice(0)
            .reverse()
            .map((quiz) => (
                <div className="created-quiz-container" key={quiz.quizioID}>
                    <CreatedQuiz data={quiz} />
                </div>
            ))}
          </>
      )}
      </div>
  );
};
export default CreatedQuizzes;
