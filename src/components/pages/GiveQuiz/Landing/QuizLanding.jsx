import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useGetResponseStatus } from '@api/quizzes/useResponse';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';
import Fetching from '@components/Misc/Fetching';
import ReactMarkdown from 'react-markdown';

const QuizLanding = () => {
  const history = useHistory();
  const { quizID } = useParams();
  const userID = useSelector((state) => state.auth.user.userID);

  // Get Quiz Query
  const {
    data: quizData,
    isLoading: isQuizDataLoading,
    isSuccess: isQuizDataSuccess,
  } = useGetQuiz(quizID);

  // Get Response Status Query
  const {
    data: responseStatusData,
    isSuccess: isResponseStatusSuccess,
  } = useGetResponseStatus(userID, quizID);

  // Give quiz Store
  const {
    setQuiz,
    setAnsweredQuestions,
    setMarkedAnsweredQuestions,
    setMarkedQuestions,
    setCurrentSection,
    sections,
  } = useGiveQuizStore();

  const handleContinue = () => {
    history.push(`/quiz/attempt/${quizID}/${quizData?.quiz?.sections[0]}`);
    setCurrentSection(sections[0].title);
  };

  // handle response status
  useEffect(() => {
    if (isResponseStatusSuccess) {
      const answeredQuestions = responseStatusData?.data?.data
        .filter((val) => val.status === 'answered')
        .map((val) => val.questionID);
      const markedAnsweredQuestions = responseStatusData?.data?.data
        .filter((val) => val.status === 'marked-answered')
        .map((val) => val.questionID);
      const markedQuestions = responseStatusData?.data?.data
        .filter((val) => val.status === 'marked')
        .map((val) => val.questionID);

      setAnsweredQuestions(answeredQuestions);
      setMarkedAnsweredQuestions(markedAnsweredQuestions);
      setMarkedQuestions(markedQuestions);
    }
  }, [isResponseStatusSuccess, responseStatusData]);

  // handle quiz data fetch
  useEffect(() => {
    if (isQuizDataSuccess) {
      log('Fetched Quiz Data:', { quizData });
      setQuiz({
        name: quizData?.quiz?.name,
        description: quizData?.quiz?.description,
        sections: quizData?.quiz?.sections,
        quizioID: quizID,
        startTime: quizData?.quiz?.startTime,
        endTime: quizData?.quiz?.endTime,
      });
    }
  }, [isQuizDataSuccess, quizData]);

  // DEBUG
  useEffect(() => {
    log('QuizLanding', { quizID }, false);
  }, [quizID]);

  if (isQuizDataLoading) return <Fetching />;

  return (
      <>
          <h1 className="text-3xl font-bold">
              {quizData?.quiz?.name || 'Quiz Name not provided'}
          </h1>
          {/* {quizData?.quiz?.description || 'No description available'} */}

          <div className="mt-6">
              {/* eslint-disable-next-line react/no-children-prop */}
              <ReactMarkdown children={quizData?.quiz?.description || 'No description available'} />
          </div>
          <h2 className="mt-8 text-2xl font-semibold">Instructions</h2>
          {/* <p className="text-grey-N6 mt-6">
              {quizData?.quiz?.instructions || 'No instructions available'}
          </p> */}
          <div className="mt-6">
              {/* eslint-disable-next-line react/no-children-prop */}
              <ReactMarkdown children={quizData?.quiz?.instructions || 'No instructions available'} />
          </div>
          <div className="ml-auto mt-16 w-28">
              <PrimaryCTA text="Continue" onClick={handleContinue} />
          </div>
      </>
  );
};

export default QuizLanding;
