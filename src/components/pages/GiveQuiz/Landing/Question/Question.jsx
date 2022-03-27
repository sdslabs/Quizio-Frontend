import React, { useEffect, useState } from 'react';
import { useGetQuestion } from '@api/quizzes/useQuestions';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useGetResponse, useUpdateResponse } from '@api/quizzes/useResponse';
import { useSelector } from 'react-redux';
import log from '@utils/log';
import Fetching from '@components/Misc/Fetching';
import ClearResponses from './ClearResponses';
import QuestionMain from './QuestionMain';
import MarkForReview from './MarkForReview';
import SaveAndNext from './SaveAndNext';
import QuestionMarks from './QuestionMarks';

const Question = () => {
  // User ID from redux
  const userID = useSelector((state) => state.auth.user.userID);

  // Local states
  const [questionData, setQuestionData] = useState({});
  const [choice, setChoice] = useState(null); // MCQ Choice
  const [answer, setAnswer] = useState(''); // Subjective Answer

  // Global give quiz store
  const { currentQuestion, currentQuestionIndex } = useGiveQuizStore();

  // Get question query
  const { data, isLoading, isSuccess } = useGetQuestion(currentQuestion);

  // update response mutation
  const { isSuccess: responseSucess } = useUpdateResponse();

  // get original response query
  const {
    data: originalResponseData,
    isSuccess: isGetOriginalResponseSuccess,
    isError: isGetOriginalResponseError,
  } = useGetResponse(userID, currentQuestion);

  useEffect(() => {
    if (responseSucess) {
      log('response Successfully saved');
    }
  }, [responseSucess]);

  useEffect(() => {
    if (isGetOriginalResponseSuccess) {
      if (originalResponseData.data.data.answerChoices) {
        log({ answerChoice: originalResponseData.data.data.answerChoices[0] });
        setChoice(originalResponseData.data.data.answerChoices[0]);
      }
      setAnswer(originalResponseData.data.data.answer);
    } else {
      setChoice(null);
      setAnswer('');
    }
  }, [isGetOriginalResponseSuccess, originalResponseData, isGetOriginalResponseError]);

  useEffect(() => {
    if (isSuccess) {
      setQuestionData(data?.data?.data?.question);
    }
  }, [isSuccess, isLoading, data]);

  if (isLoading) return <Fetching />;
  return (
      <div>
          <div className="flex flex-row justify-between items-center py-4">
              <p className="text-black-N6 font-semibold">
                  Question
                  {' '}
                  {currentQuestionIndex}
              </p>
              {questionData && <QuestionMarks questionData={questionData} />}
          </div>

          <QuestionMain
            questionData={questionData}
            choice={choice}
            setChoice={setChoice}
            answer={answer}
            setAnswer={setAnswer}
          />

          <ClearResponses setAnswer={setAnswer} setChoice={setChoice} />

          <div className="flex flex-row justify-end mt-8">
              <MarkForReview
                questionData={questionData}
                choice={choice}
                answer={answer}
              />
              <SaveAndNext
                questionData={questionData}
                choice={choice}
                answer={answer}
              />
          </div>
      </div>
  );
};

export default Question;
