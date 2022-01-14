import React from 'react';
import { useSelector } from 'react-redux';
import Questions from './Questions';
import QuizDetails from './QuizDetails';
import RegistrationForm from './RegistrationForm';
import Registrations from './Registrations';

const MainForm = () => {
  const selected = useSelector((state) => state.quiz.createQuizStage);

  return (
      <div className="create-quiz-main-form">
          {(() => {
        switch (selected) {
          case 'Quiz Details':
            return <QuizDetails />;
          case 'Registration form':
            return <RegistrationForm />;
          case 'Questions':
            return <Questions />;
          case 'Registrations':
            return <Registrations />;
          default:
            return <QuizDetails />;
        }
      })()}
      </div>
  );
};
export default MainForm;
