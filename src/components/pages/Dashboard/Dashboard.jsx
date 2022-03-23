import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '@components/Navbar';
import LoadingPage from '@pages/Loading';
import { useCreateQuiz } from '@api/quizzes/useQuizzes';
import log from '@utils/log';
// import Status from './Status';
import MyQuizzes from './MyQuizzes';
import '@pagestyles/dashboard/index.scss';

const Dashboard = () => {
  const history = useHistory();
  const {
 mutate, data, isLoading, isSuccess,
} = useCreateQuiz();

  const handleHostQuiz = () => {
    mutate();
  };

  useEffect(() => {
    if (data?.success) {
      const { quizioID } = data.data.quiz;
      history.push(`/quiz/edit/${quizioID}`);
    } else {
      log('Failed to create quiz!', data);
    }
  }, [isSuccess]);

  return (
      <>
          {isLoading ? (
              <LoadingPage />
      ) : (
          <div className="dashboard">
              <Navbar type="dashboard" handleHostQuiz={handleHostQuiz} />
              <div className="top">
                  {/* <Status /> */}
              </div>
              <div className="bottom">
                  <MyQuizzes />
              </div>
          </div>
      )}
      </>
  );
};
export default Dashboard;
