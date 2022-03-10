import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import log from '@utils/log';
import SideNav from './SideNav';
import MainForm from './MainForm';
import '@pagestyles/create_quiz/index.scss';

const CreateQuiz = () => {
  const { quizID } = useParams();

  useEffect(() => {
    log(quizID);
  }, [quizID]);

  return (
      <div className="create-quiz">
          <Navbar />
          <div className="create-quiz-main">
              <SideNav />
              <MainForm />
          </div>
      </div>
  );
};

export default CreateQuiz;
