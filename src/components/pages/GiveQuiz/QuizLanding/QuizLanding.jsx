import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
import StartQuizModal from '@pages/Register/StartQuizModal';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import log from '@utils/log';
import MasterWrapper from '../MasterWrapper';

const mapQuizData = (data) => data?.data?.data?.quiz || {};

const QuizLanding = () => {
  const { quizID } = useParams();
  const { data, isLoading, isSuccess } = useGetQuiz(quizID);
  const [showModal, setShowModal] = useState(false);

  const { setQuiz } = useGiveQuizStore();

  useEffect(() => {
    if (isSuccess) {
      const { name, description, sections } = mapQuizData(data);
      setQuiz({
        name,
        description,
        sections,
        quizioID: quizID,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    log('Quiz Landing!');
    log({ quizID });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const { name, description, instruction } = mapQuizData(data);

  return (
      <MasterWrapper>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-grey-N6 mt-6">{description}</p>
          <h2 className="mt-8 text-2xl font-semibold">Instructions</h2>
          <p className="text-grey-N6 mt-6">
              {instruction || 'No instructions available'}
          </p>
          <div className="ml-auto mt-16 w-28">
              <PrimaryCTA text="Continue" onClick={() => setShowModal(true)} />
          </div>
          <ModalWrapper
            showModal={showModal}
            hideOnOverlayClick
            setShowModal={setShowModal}
          >
              <StartQuizModal setShowModal={setShowModal} />
          </ModalWrapper>
      </MasterWrapper>
  );
};

export default QuizLanding;
