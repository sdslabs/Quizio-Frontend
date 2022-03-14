import React, { useEffect } from 'react';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import log from '@utils/log';
import Question from './Question';
import SectionDescription from './SectionDescription';

const Questions = () => {
  const { showQuestion } = useCreateQuizStore();

  useEffect(() => {
    log('Questions Page showQuestion update', { showQuestion });
  }, [showQuestion]);

  return showQuestion ? <Question /> : <SectionDescription />;
};

export default Questions;
