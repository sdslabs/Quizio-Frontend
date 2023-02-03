/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useUpdateResponse } from '@api/quizzes/useResponse';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { findIndex } from 'lodash';
import log from '@utils/log';

const SaveAndNext = ({ questionData, answer, choice }) => {
  // Section ID from params
  const { sectionID } = useParams(); // TODO: move to global store
  const { quizID } = useParams();
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const history = useHistory();
  // Global give quiz store
  const {
    currentQuestion,
    sections,
    setCurrentQuestion,
    setCurrentQuestionIndex,
    setCurrentSection,
    addAnsweredQuestion,
    removeAnsweredQuestion,
    addMarkedAnsweredQuestion,
    removeMarkedAnsweredQuestion,
    addMarkedQuestion,
    removeMarkedQuestion,
    markedAnsweredQuestions,
    markedQuestions,
    currentQuestionIndex,
    switchToNextQuestion,
  } = useGiveQuizStore();

  // update response mutation
  const { mutate: updateResponse } = useUpdateResponse();
  const saveAndNext = () => {
    let status = 'unanswered';
    if (
      (choice !== undefined && choice !== null)
      || (answer !== '' && answer !== undefined && answer !== null)
    ) {
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

    const currentSectionIndex = findIndex(sections, { quizioID: sectionID });
    if (
      currentQuestionIndex === sections[currentSectionIndex].questions.length
    ) {
      if (currentSectionIndex === sections.length - 1) {
        // Last question
        setCurrentQuestion(null);
        setCurrentQuestionIndex(0);
        history.push(`/quiz/attempt/${quizID}?submit=true`);
      } else {
        history.push(
          `/quiz/attempt/${quizID}/${
            sections[currentSectionIndex + 1].quizioID
          }`,
        );
        setCurrentQuestion(null);
        setCurrentQuestionIndex(0);
        setCurrentSection(sections[currentSectionIndex + 1].title);
      }
    } else {
      switchToNextQuestion(sectionID);
    }
  };

  useEffect(() => {
    const currentSectionIndex = findIndex(sections, { quizioID: sectionID });

    setIsLastQuestion(
      currentQuestionIndex === sections[currentSectionIndex].questions.length
        && currentSectionIndex === sections.length - 1,
    );
  }, [currentQuestionIndex]);

  return (
      <span className="w-100">
          <PrimaryCTA
            text={isLastQuestion ? 'Save and Submit Quiz' : 'Save and next'}
            onClick={saveAndNext}
          />
      </span>
  );
};

SaveAndNext.propTypes = {
  questionData: PropTypes.object,
  answer: PropTypes.string,
  choice: PropTypes.string,
};

SaveAndNext.defaultProps = {
  questionData: {},
  answer: '',
  choice: null,
};

export default SaveAndNext;
