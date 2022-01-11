import React from 'react';
import Navbar from './Navbar';
import SideNav from './SideNav';
import '@pagestyles/create_quiz/index.scss';
import MainForm from './MainForm';

const CreateQuiz = () => {
  const a = 1;
  console.log(a);

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
