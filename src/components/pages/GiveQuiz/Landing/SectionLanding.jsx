import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Redirect, useParams, Route } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
import SubmitQuiz from '@components/Modals/SubmitQuiz';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import log from '@utils/log';
import ReactMarkdown from 'react-markdown';
import Page404 from '@pages/404';
import { useCheckAccessCode } from '@api/register/useRegister';
import QuestionsWrapper from './QuestionsWrapper';

const SectionLanding = () => {
  const { sectionID, quizID, accessCode } = useParams();
  const [isAccessCodeCorrect, setIsAccessCodeCorrect] = useState(false);

  // Local states
  const [showModal, setShowModal] = useState(false);

  // check access code
  const {
    data: accessCodeData,
    isSuccess: accessCodeDataSuccess,
  } = useCheckAccessCode(quizID, accessCode);

  // Global quiz store
  const {
    sections,
    currentQuestion,
    quiz,
    startAnsweringSection,
  } = useGiveQuizStore();

  const { title, description } = _.find(sections, { quizioID: sectionID }) || {};

  const handleStartAnswering = () => startAnsweringSection(sectionID);

  // DEBUG
  useEffect(() => {
    log('Section Landing: ', { sectionID, quizID }, false);
  }, [sectionID, quizID]);

  useEffect(() => {
    if (accessCodeDataSuccess) {
      if (accessCodeData?.data?.data?.correct) {
        setIsAccessCodeCorrect(true);
      }
    }
  }, [accessCodeDataSuccess]);

  if (!quiz.quizioID) return <Redirect to={`/quiz/attempt/${quizID}/${accessCode}`} />;

  if (!isAccessCodeCorrect) return <Route component={Page404} />;

  if (currentQuestion) return <QuestionsWrapper accessCode={accessCode} />;

  return (
      <>
          <h1 className="text-3xl font-bold">{title || 'Section Title'}</h1>
          <h2 className="mt-8 text-2xl font-semibold">Section Instructions</h2>
          {/* <p className="text-grey-N6 mt-6">
              {description || 'No description provided'}
          </p> */}
          <div className="text-grey-N6 mt-6">
              {/* eslint-disable-next-line react/no-children-prop */}
              <ReactMarkdown children={description || 'No description available'} />
          </div>
          <div className="ml-auto mt-16 w-40">
              <PrimaryCTA text="Start Answering" onClick={handleStartAnswering} />
          </div>
          {showModal && (
          <ModalWrapper
            showModal={showModal}
            setShowModal={setShowModal}
            hideOnOverlayClick
          >
              <SubmitQuiz />
          </ModalWrapper>
      )}
      </>
  );
};

export default SectionLanding;
