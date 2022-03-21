import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import log from '@utils/log';
import { useSelector } from 'react-redux';
import { useGetStatus } from '@api/quizzes/useResponse';

const QuizLanding = () => {
  const history = useHistory();
  const { quizID } = useParams();
  const userID = useSelector((state) => state.auth.user.userID);

  const {
 data, isLoading, isSuccess, sections,
} = useGetQuiz(quizID);

  const {
    setQuiz,
    setAnsweredQuestions,
    setMarkedAnsweredQuestions,
    setMarkedQuestions,
  } = useGiveQuizStore();

  const { data: statusData, isSuccess: statusIsSuccess } = useGetStatus(
    userID,
    quizID,
  );

  useEffect(() => {
    if (statusIsSuccess) {
      const answeredQuestions = statusData.data.data
        .filter((val) => val.status === 'answered')
        .map((val) => val.questionID);
      const markedAnsweredQuestions = statusData.data.data
        .filter((val) => val.status === 'marked-answered')
        .map((val) => val.questionID);
      const markedQuestions = statusData.data.data
        .filter((val) => val.status === 'marked')
        .map((val) => val.questionID);
      setAnsweredQuestions(answeredQuestions);
      setMarkedAnsweredQuestions(markedAnsweredQuestions);
      setMarkedQuestions(markedQuestions);
    }
  }, [statusIsSuccess]);

  useEffect(() => {
    if (isSuccess) {
      log({ quizData: data });
      setQuiz({
        name: data.quiz.name,
        description: data.quiz.description,
        sections: data.quiz.sections,
        quizioID: quizID,
        startTime: data.quiz.startTime,
        endTime: data.quiz.endTime,
      });
      /*
            let totalQuestions = 0;
            console.log(data);
            data.quiz.sections.forEach((section) => {
                section.questions.forEach(() => { totalQuestions += 1; });
            });
            setTotalQuestions(totalQuestions); */
    }
  }, [isSuccess]);

  useEffect(() => {
    log('quizlanding', { quizID });
  }, [quizID]);

  const handleContinue = () => {
    log(sections);
    history.push(`/quiz/attempt/${quizID}/${data?.quiz?.sections[0]}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
      <>
          <h1 className="text-3xl font-bold">{data.quiz.name}</h1>
          <p className="text-grey-N6 mt-6">{data.quiz.description}</p>
          <h2 className="mt-8 text-2xl font-semibold">Instructions</h2>
          <p className="text-grey-N6 mt-6">
              {data.quiz.instruction || 'No instructions available'}
          </p>
          <div className="ml-auto mt-16 w-28">
              <PrimaryCTA text="Continue" onClick={handleContinue} />
          </div>
      </>
  );
};

export default QuizLanding;
