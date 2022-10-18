import React, { useEffect, useState } from 'react';
import { useGetQuiz, useUpdateQuiz } from '@api/quizzes/useQuizzes';
import useCreateQuizStore from '@store/zustand/createQuiz';
import log from '@utils/log';

import Submit from './Submit';
import AccessCodeInput from './AccessCodeInput';
import QuizNameInput from './QuizNameInput';
import DateTimeInput from './DateTimeInput';
import QuizBanner from './QuizBanner';
import OwnersInput from './OwnersInput';
import QuizDescription from './QuizDescription';
import QuizInstructions from './QuizInstructions';

import '@pagestyles/create_quiz/quiz_details.scss';

const QuizDetails = () => {
  // Global Stores
  const { setCurrentStage, currentID } = useCreateQuizStore();

  // APIs
  const {
    isSuccess: isUpdateSuccess,
    mutate: mutateQuizDetails,
  } = useUpdateQuiz();
  const { data } = useGetQuiz(currentID);

  // Form inputs
  const [quizName, setQuizName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [owners, setOwners] = useState(['']);
  const [accessCode, setAccessCode] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [quizInst, setQuizInst] = useState('');
  const [imageURL, setImageURL] = useState('');

  // Form validators (TODO: Move to individual components)
  const [isDateTimeValid, setIsDateTimeValid] = useState(true);

  const handleSubmit = () => {
    console.log('is date time valid', isDateTimeValid);
    if (!isDateTimeValid) {
      log('Error with quiz time');
      return;
    }
    const quizID = currentID;

    const body = {
      name: quizName,
      description: quizDesc,
      instructions: quizInst,
      owners,
      startTime,
      endTime,
      startWindow: 600, // TODO: add this as a custom input (currently 600s = 10mins)
      accessCode,
      bannerURL: imageURL,
    };
    mutateQuizDetails({ quizID, body });
  };

  useEffect(() => {
    if (isUpdateSuccess) setCurrentStage('Registration form');
    else log('Failed to update quiz :(');
  }, [isUpdateSuccess]);

  useEffect(async () => {
    log('QuizData: ', data.quiz);
    setQuizName(data.quiz?.name);
    setStartTime(data?.quiz?.startTime);
    setEndTime(data?.quiz?.endTime);
    setOwners(data?.quiz?.owners);
    setAccessCode(data?.quiz?.accessCode);
    setQuizDesc(data?.quiz?.description);
    setQuizInst(data?.quiz?.instructions);
    setImageURL(data?.quiz?.bannerURL);
  }, [data]);

  return (
      <div className="quiz-details">
          <div className="top">
              <div className="details">
                  <div className="quiz-details-title">Quiz Details</div>
                  <QuizNameInput setQuizName={setQuizName} quizName={quizName || ''} />
                  <DateTimeInput
                    setIsDateTimeValid={setIsDateTimeValid}
                    setStartDateTime={setStartTime}
                    setEndDateTime={setEndTime}
                    defaultStartTime={startTime}
                    defaultEndTime={endTime}
                  />
              </div>
              <QuizBanner setImageURL={setImageURL} imageURL={imageURL} />
          </div>
          <OwnersInput owners={owners} setOwners={setOwners} />
          <AccessCodeInput
            accessCode={accessCode || ''}
            setAccessCode={setAccessCode}
          />
          <QuizDescription quizDesc={quizDesc || ''} setQuizDesc={setQuizDesc} />
          <QuizInstructions quizInst={quizInst || ''} setQuizInst={setQuizInst} />
          <Submit handleSubmit={handleSubmit} />
      </div>
  );
};

export default QuizDetails;
