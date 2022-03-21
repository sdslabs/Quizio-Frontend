/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useUpdateResponse } from '@api/quizzes/useResponse';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';

const SaveAndNext = ({ questionData, answer, choice }) => {
  // Section ID from params
  const { sectionID } = useParams(); // TODO: move to global store

  // Global give quiz store
  const {
    currentQuestion,
    addAnsweredQuestion,
    removeAnsweredQuestion,
    addMarkedAnsweredQuestion,
    removeMarkedAnsweredQuestion,
    addMarkedQuestion,
    removeMarkedQuestion,
    markedAnsweredQuestions,
    markedQuestions,
    switchToNextQuestion,
  } = useGiveQuizStore();

  // update response mutation
  const { mutate: updateResponse } = useUpdateResponse();

  const saveAndNext = () => {
    let status = 'unanswered';
    if (choice !== null || answer !== '') {
      status = 'answered';
    }
    if (
      markedQuestions.includes(currentQuestion)
      || markedAnsweredQuestions.includes(currentQuestion)
    ) {
      if (status === 'answered') {
        status = 'marked-answered';
      } else {
        status = 'marked';
      }
    }
    switch (status) {
      case 'unanswered':
        removeAnsweredQuestion(currentQuestion);
        break;
      case 'answered':
        addAnsweredQuestion(currentQuestion);
        break;
      case 'marked':
        addMarkedQuestion(currentQuestion);
        removeMarkedAnsweredQuestion(currentQuestion);
        break;
      case 'marked-answered':
        addMarkedAnsweredQuestion(currentQuestion);
        removeMarkedQuestion(currentQuestion);
        break;
      default:
        removeAnsweredQuestion(currentQuestion);
        break;
    }
    switch (questionData.type) {
      case 'mcq':
        log({ choice });
        updateResponse({
          body: {
            questionID: currentQuestion,
            answerChoices: [choice],
            status,
          },
        });
        break;
      case 'subjective':
        updateResponse({
          body: { questionID: currentQuestion, answer, status },
        });
        break;
      default:
        updateResponse({
          body: {
            questionID: currentQuestion,
            answerChoices: [choice],
            status,
          },
        });
        break;
    }
    switchToNextQuestion(sectionID);
  };

  return (
      <span className="w-100">
          <PrimaryCTA text="Save and next" onClick={saveAndNext} />
      </span>
  );
};

SaveAndNext.propTypes = {
  questionData: PropTypes.object,
  answer: PropTypes.string,
  choice: PropTypes.object,
};

SaveAndNext.defaultProps = {
  questionData: {},
  answer: '',
  choice: null,
};

export default SaveAndNext;
