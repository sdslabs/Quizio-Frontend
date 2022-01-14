import React from 'react';
import Navbar from './Navbar';
import SideNav from './SideNav';
import MainForm from './MainForm';
import '@pagestyles/create_quiz/index.scss';

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
