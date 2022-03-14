import React from 'react';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import Question from './Question';
import SectionDescription from './SectionDescription';

const Questions = () => {
  const { showQuestion } = useCreateQuizStore();

  return showQuestion ? <Question /> : <SectionDescription />;
};

export default Questions;
