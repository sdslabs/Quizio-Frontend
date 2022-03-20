/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useGetScore, useUpdateScore } from '@api/quizzes/useScore';
import { PropTypes } from 'prop-types';
import RadioButton from '@components/Input/RadioGroup/RadioButton';
import TextField from '@components/Input/TextField';
import useCheckQuizStore from '@redux/store/zustand/checkQuiz';
import { useGetQuestion } from '@api/quizzes/useQuestions';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useGetResponse, useUpdateResponse } from '@api/quizzes/useResponse';
import { useSelector } from 'react-redux';
import log from '@utils/log';
import { findIndex } from 'lodash';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import Descriptive from './Descriptive';
import MCQ from './MCQ';

const QuestionsWrapper = () => {
  const { currentQuestion, currentSection } = useGiveQuizStore();

  if (!currentQuestion) {
    return (
        <>
            <h1 className="text-3xl font-bold">
                Select a question to start checking.
            </h1>
        </>
    );
  }
  return (
      <>
          <h1 className="text-3xl font-bold">{currentSection}</h1>
          <Question />
      </>
  );
};

const Question = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    currentSection,
    addAnsweredQuestion,
    removeAnsweredQuestion,
    addMarkedAnsweredQuestion,
    removeMarkedAnsweredQuestion,
    addMarkedQuestion,
    removeMarkedQuestion,
    switchToNextQuestion,
    quiz,
    sections,
    answeredQuestions,
    markedAnsweredQuestions,
    markedQuestions,
  } = useGiveQuizStore();
  const history = useHistory();
  const { participantID, sectionID } = useParams();
  const [questionData, setQuestionData] = useState({});
  const [choice, setChoice] = useState(null);
  const [answer, setAnswer] = useState('');
  const { data, isLoading, isSuccess } = useGetQuestion(currentQuestion);

  const userID = useSelector((state) => state.auth.user.userID);

  const {
    mutate: updateResponse,
    isLoading: responseLoading,
    isSuccess: responseSucess,
  } = useUpdateResponse();

  const {
    data: responseData,
    isSuccess: getResponseSuccess,
    isLoading: getResponseLoading,
  } = useGetResponse(userID, currentQuestion);

  log({ userID });
  log({ currentQuestion });

  useEffect(() => {
    if (responseSucess) {
      log('response Successful');
    }
  }, [responseSucess]);

  useEffect(() => {
    if (getResponseSuccess) {
      if (responseData.data.data.answerChoices) {
        log({ answerChoice: responseData.data.data.answerChoices[0] });
        setChoice(responseData.data.data.answerChoices[0]);
      }
      setAnswer(responseData.data.data.answer);
    }
  }, [getResponseSuccess, responseData]);

  const saveAndNext = () => {
    let status = 'unanswered';
    if (choice !== null || answer !== '') {
      status = 'answered';
    }
    if (markedQuestions.includes(currentQuestion) || markedAnsweredQuestions.includes(currentQuestion)) {
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
        console.log(choice, 'choice');
        updateResponse({
          body: { questionID: currentQuestion, answerChoices: [choice], status },
        });
        break;
      case 'subjective':
        updateResponse({ body: { questionID: currentQuestion, answer, status } });
        break;
      default:
        updateResponse({
          body: { questionID: currentQuestion, answerChoices: [choice], status },
        });
        break;
    }
    switchToNextQuestion(sectionID);
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestionData(data.data.data.question);
    }
  }, [isSuccess, isLoading, data]);

  const handleClear = () => {
    setAnswer('');
    setChoice(null);
  };

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
          body: { questionID: currentQuestion, answerChoices: [choice], status },
        });
        break;
      case 'subjective':
        updateResponse({ body: { questionID: currentQuestion, answer, status } });
        break;
      default:
        updateResponse({
          body: { questionID: currentQuestion, answerChoices: [choice], status },
        });
        break;
    }
    // removeAnsweredQuestion(currentQuestion);
    // addAnsweredQuestion(currentQuestion);
  };

  if (isLoading) {
    return <>Loading...</>;
  }
  const isMarked = markedAnsweredQuestions.includes(currentQuestion) || markedQuestions.includes(currentQuestion);
  return (
      <div>
          <div className="flex flex-row justify-between items-center py-4">
              <p className="text-black-N6 font-semibold">
                  Question
                  {' '}
                  {currentQuestionIndex}
              </p>
              <p className="text-purple-V6 font-semibold">
                  Marks :
                  {' '}
                  {questionData?.maxMarks || 0}
              </p>
          </div>
          {questionData.type === 'mcq' ? (
              <MCQ
                questionText={questionData.question}
                options={questionData.choices}
                selected={choice}
                setChoice={setChoice}
              />
      ) : (
          <Descriptive
            questionText={questionData.question}
            answer={answer}
            setAnswer={setAnswer}
          />
      )}

          <div className="flex flex-row justify-end mt-8">
              <button
                className="w-100 text-purple cursor-pointer"
                onClick={handleClear}
                type="button"
              >
                  Clear Responses
              </button>
          </div>

          <div className="flex flex-row justify-end mt-8">
              <span className="w-100 mr-8">
                  <SecondaryCTA text={isMarked ? 'Unmark Question' : 'Mark for Review'} onClick={markForReview} />
              </span>
              <span className="w-100">
                  <PrimaryCTA text="Save and next" onClick={saveAndNext} />
              </span>
          </div>
      </div>
  );
};

export default QuestionsWrapper;
