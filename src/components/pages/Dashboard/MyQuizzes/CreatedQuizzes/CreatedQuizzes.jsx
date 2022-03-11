import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { getAllQuizzesForUser } from '@api/quizzes/quizzesFetcher';
import CreatedQuiz from './CreatedQuiz';
import '@pagestyles/dashboard/created_quizzes.scss';

const CreatedQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await getAllQuizzesForUser();
    if (res.success) {
      setQuizzes(res.data.quizzes);
    }

    setLoading(false);
  }, []);

  return (
      <div className="created-quizzes-list">
          {loading ? (
              <div>Fetching created quizzes...</div>
      ) : (
          <>
              {quizzes.slice(0).reverse().map((quiz) => (
                  <div className="created-quiz-container" key={nanoid()}>
                      <CreatedQuiz data={quiz} />
                  </div>
          ))}
          </>
      )}
      </div>
  );
};
export default CreatedQuizzes;
