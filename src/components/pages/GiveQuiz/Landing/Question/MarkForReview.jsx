/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useUpdateResponse } from '@api/quizzes/useResponse';

const MarkForReview = ({ questionData, answer, choice }) => {
  // Global give quiz store
  const {
    currentQuestion,
    addAnsweredQuestion,
    removeAnsweredQuestion,
    addMarkedAnsweredQuestion,
    removeMarkedAnsweredQuestion,
    addMarkedQuestion,
    removeMarkedQuestion,
    answeredQuestions,
    markedAnsweredQuestions,
    markedQuestions,
  } = useGiveQuizStore();

  // update response mutation
  const { mutate: updateResponse } = useUpdateResponse();

  const markForReview = () => {
    let status = 'marked';

    if (answeredQuestions.includes(currentQuestion)) {
      status = 'marked-answered';
    } else if (markedQuestions.includes(currentQuestion)) {
      status = 'unanswered';
    } else if (markedAnsweredQuestions.includes(currentQuestion)) {
      status = 'answered';
    }

    switch (status) {
      case 'marked':
        addMarkedQuestion(currentQuestion);
        break;
      case 'marked-answered':
        removeAnsweredQuestion(currentQuestion);
        addMarkedAnsweredQuestion(currentQuestion);
        break;
      case 'unanswered':
        removeMarkedQuestion(currentQuestion);
        break;
      case 'answered':
        removeMarkedAnsweredQuestion(currentQuestion);
        addAnsweredQuestion(currentQuestion);
        break;
      default:
        removeMarkedQuestion(currentQuestion);
    }

    switch (questionData.type) {
      case 'mcq':
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
    // removeAnsweredQuestion(currentQuestion);
    // addAnsweredQuestion(currentQuestion);
  };

  const isMarked = markedAnsweredQuestions.includes(currentQuestion)
    || markedQuestions.includes(currentQuestion);

  return (
      <span className="w-100 mr-8">
          <SecondaryCTA
            text={isMarked ? 'Unmark Question' : 'Mark for Review'}
            onClick={markForReview}
          />
      </span>
  );
};

MarkForReview.propTypes = {
  questionData: PropTypes.object,
  answer: PropTypes.string,
  choice: PropTypes.object,
};

MarkForReview.defaultProps = {
  questionData: {},
  answer: '',
  choice: null,
};

export default MarkForReview;
