import React from 'react';
import useCreateQuizStore from '@store/zustand/createQuiz';
import Questions from './QuestionsMain';
import QuizDetails from './QuizDetails';
import Registrations from './Registrations';
import RegistrationForm from './RegistrationForm';

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
