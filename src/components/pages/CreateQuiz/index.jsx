import React from 'react';
import Navbar from './Navbar';
import QuizDetails from './QuizDetails';
import SideNav from './SideNav';
import '@pagestyles/create_quiz/index.scss';

const CreateQuiz = () => {
  const a = 1;
  console.log(a);

  return (
      <div className="create-quiz">
          <Navbar />
          <div className="create-quiz-main">
              <SideNav />
              <QuizDetails />
          </div>
      </div>
  );
};

export default CreateQuiz;
