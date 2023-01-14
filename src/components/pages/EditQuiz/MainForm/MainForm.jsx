import React from 'react';
import useCreateQuizStore from '@store/zustand/createQuiz';
import Questions from './Questions';
import QuizDetails from './QuizDetails';
import RegistrationForm from './RegistrationForm';

const MainForm = () => {
  const currentStage = useCreateQuizStore((state) => state.currentStage)

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
          default:
            return null
        }
      })()}
      </div>
  );
};
export default MainForm;
