/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
import SubmitQuiz from '@components/Modals/SubmitQuiz';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import _ from 'lodash';
import log from '@utils/log';
import QuestionsWrapper from './Questions';

const SectionLanding = () => {
  const { sectionID, quizID } = useParams();
  const { sections, currentQuestion } = useGiveQuizStore();
  log('Section Landing: ', { sectionID, quizID });
  const [showModal, setShowModal] = React.useState(false);

    const currentSection = _.find(sections, { quizioID: sectionID }) || {};
    const { title, description } = currentSection;
    if (currentQuestion) {
        return (
            <QuestionsWrapper />
        );
    }
    return (
        <>
            <h1 className="text-3xl font-bold">{title}</h1>
            <h2 className="mt-8 text-2xl font-semibold">Section Instructions</h2>
            <p className="text-grey-N6 mt-6">
                {description || 'No description provided'}
            </p>
            <div className="ml-auto mt-16 w-40">
                <PrimaryCTA text="Start Answering" onClick={() => setShowModal(true)} />
            </div>
            <ModalWrapper showModal={showModal} setShowModal={setShowModal} hideOnOverlayClick><SubmitQuiz /></ModalWrapper>
        </>
    );
};

export default SectionLanding;
