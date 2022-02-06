import React from 'react';
import useCreateQuizStore from '@store/zustand/createQuiz';
import Questions from './QuestionsMain';
import QuizDetails from './QuizDetails';
import RegistrationForm from './RegistrationForm';
import Registrations from './Registrations';

const MainForm = () => {
  const { currentStage } = useCreateQuizStore();

  return (
      <div className="create-quiz-main-form">
          {(() => {
        switch (currentStage) {
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
