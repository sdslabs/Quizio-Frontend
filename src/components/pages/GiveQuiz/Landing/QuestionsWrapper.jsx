import React from 'react';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import LoadingPage from '@components/pages/Loading/Loading';
import PropTypes from 'prop-types';
import Question from './Question';

const QuestionsWrapper = ({ accessCode }) => {
  const { currentQuestion, currentSection } = useGiveQuizStore();

  if (!currentQuestion) return <LoadingPage />;

  return (
      <>
          <h1 className="text-3xl font-bold">{currentSection}</h1>
          <Question accessCode={accessCode} />
      </>
  );
};

QuestionsWrapper.propTypes = {
  accessCode: PropTypes.string.isRequired,
};

export default QuestionsWrapper;
