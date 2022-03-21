import React from 'react';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import LoadingPage from '@components/pages/Loading/Loading';
import Question from './Question';

const QuestionsWrapper = () => {
  const { currentQuestion, currentSection } = useGiveQuizStore();

  if (!currentQuestion) return <LoadingPage />;

  return (
      <>
          <h1 className="text-3xl font-bold">{currentSection}</h1>
          <Question />
      </>
  );
};

export default QuestionsWrapper;
