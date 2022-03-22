import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Redirect, useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
import SubmitQuiz from '@components/Modals/SubmitQuiz';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import log from '@utils/log';
import ReactMarkdown from 'react-markdown';
import QuestionsWrapper from './QuestionsWrapper';

const SectionLanding = () => {
  const { sectionID, quizID } = useParams();
  // Local states
  const [showModal, setShowModal] = useState(false);
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

  if (!quiz.quizioID) return <Redirect to={`/quiz/attempt/${quizID}`} />;

  if (currentQuestion) return <QuestionsWrapper />;

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
