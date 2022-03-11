import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetQuiz, useUpdateQuiz } from '@api/quizzes/useQuizzes';
import useCreateQuizStore from '@store/zustand/createQuiz';
import log from '@utils/log';

import Submit from './Submit';
import AccessCodeInput from './AccessCodeInput';
import QuizNameInput from './QuizNameInput';
import DateTimeInput from './DateTimeInput';
import OwnersInput from './OwnersInput';
import QuizDescription from './QuizDescription';
import QuizInstructions from './QuizInstructions';

import '@pagestyles/create_quiz/quiz_details.scss';

const QuizDetails = () => {
  const { setCurrentStage, currentID } = useCreateQuizStore();

  // Form inputs
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [owners, setOwners] = useState(['']);
  const [accessCode, setAccessCode] = useState('');

  const email = useSelector((state) => state.auth.user.email);
  const [quizName, setQuizName] = useState('');

  const [quizDesc, setQuizDesc] = useState('');
  const [quizInst, setQuizInst] = useState('');
  const [isDateTimeValid, setIsDateTimeValid] = useState(true);

  const {
    isSuccess: isUpdateSuccess,
    mutate: mutateQuizDetails,
  } = useUpdateQuiz();
  const { data } = useGetQuiz(currentID);

  const handleSubmit = () => {
    if (!isDateTimeValid) {
      log('Error with quiz time');
      return;
    }
    const quizId = new URLSearchParams(window.location.search).get('quizID');
    const quizDetails = {
      quizName,
      owners,
      startTime,
      endTime,
      accessCode,
      quizDesc,
      quizInst,
      creator: email,
    };
    mutateQuizDetails({ quizId, body: quizDetails });
  };

  useEffect(() => {
    if (isUpdateSuccess) setCurrentStage('Registration form');
  }, [isUpdateSuccess]);

  useEffect(async () => {
    log('QuizData: ', data.quiz);
    setQuizName(data.quiz?.name);
    setOwners(data?.quiz?.owners);
  }, [data]);

  return (
      <div className="quiz-details">
          <div className="quiz-details-title">Quiz Details</div>
          <QuizNameInput setQuizName={setQuizName} quizName={quizName || ''} />
          <DateTimeInput
            setIsDateTimeValid={setIsDateTimeValid}
            setStartDateTime={setStartTime}
            setEndDateTime={setEndTime}
          />
          <OwnersInput
            owners={owners}
            setOwners={setOwners}
          />
          <AccessCodeInput accessCode={accessCode || ''} setAccessCode={setAccessCode} />
          <QuizDescription quizDesc={quizDesc || ''} setQuizDesc={setQuizDesc} />
          <QuizInstructions quizInst={quizInst || ''} setQuizInst={setQuizInst} />
          <Submit handleSubmit={handleSubmit} />
      </div>
  );
};

export default QuizDetails;
