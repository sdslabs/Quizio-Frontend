import React from 'react';
import useCreateQuizStore from '@store/zustand/createQuiz';
import Questions from './QuestionsMain';
import QuizDetails from './QuizDetails';
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
          default:
            return <QuizDetails />;
        }
      })()}
      </div>
  );
};
export default MainForm;
