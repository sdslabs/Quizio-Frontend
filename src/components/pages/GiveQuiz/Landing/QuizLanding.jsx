/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useGetQuizWithAccessCode } from '@api/quizzes/useQuizzes';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';
import Fetching from '@components/Misc/Fetching';
import ReactMarkdown from 'react-markdown';
import ModalWrapper from '@components/Modals/ModalWrapper';
import SubmitQuiz from '@components/Modals/SubmitQuiz';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const QuizLanding = () => {
  const query = useQuery();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const { quizID, accessCode } = useParams();

  // Get Quiz Query
  const {
    data: quizData,
    isLoading: isQuizDataLoading,
    isSuccess: isQuizDataSuccess,
  } = useGetQuizWithAccessCode(quizID, accessCode);

  // Give quiz Store
  const {
    setQuiz,
    setCurrentSection,
    sections,
  } = useGiveQuizStore();

  const handleContinue = () => {
    history.push(`/quiz/attempt/${quizID}/${accessCode}/${quizData?.quiz?.sections[0]}`);
    setCurrentSection(sections[0].title);
  };

  useEffect(() => {
    log('QuizLanding', query.get('submit') === 'true');
    if (query.get('submit') === 'true') {
      setShowModal(true);
    }
  }, [query]);

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
              <ReactMarkdown
                children={quizData?.quiz?.description || 'No description available'}
              />
          </div>
          <h2 className="mt-8 text-2xl font-semibold">Instructions</h2>
          {/* <p className="text-grey-N6 mt-6">
              {quizData?.quiz?.instructions || 'No instructions available'}
          </p> */}
          <div className="mt-6">
              <ReactMarkdown
                children={quizData?.quiz?.instructions || 'No instructions available'}
              />
          </div>
          <div className="ml-auto mt-16 w-28">
              <PrimaryCTA text="Continue" onClick={handleContinue} />
          </div>
          {showModal && (
          <ModalWrapper
            showModal={showModal}
            setShowModal={setShowModal}
            hideOnOverlayClick
          >
              <SubmitQuiz setShowModal={setShowModal} />
          </ModalWrapper>
      )}
      </>
  );
};

export default QuizLanding;
