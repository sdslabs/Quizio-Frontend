import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
// import UserQuizRegistration from '@pages/Register/UserQuizRegistration';
import StartQuizModal from '@pages/Register/StartQuizModal';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import log from '@utils/log';

const QuizLanding = () => {
    const { quizID } = useParams();
    const { data, isLoading, isSuccess } = useGetQuiz(quizID);
    const [showModal, setShowModal] = useState(false);

    const { setQuiz } = useGiveQuizStore();

    useEffect(() => {
        if (isSuccess) {
            log({ sections: data.quiz.sections });
            setQuiz({
                name: data.quiz.name, description: data.quiz.description, sections: data.quiz.sections, quizioID: quizID,
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        log('quizlanding', { quizID });
    }, [quizID]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <h1 className="text-3xl font-bold">{data.quiz.name}</h1>
            <p className="text-grey-N6 mt-6">
                {data.quiz.description}
            </p>
            <h2 className="mt-8 text-2xl font-semibold">Instructions</h2>
            <p className="text-grey-N6 mt-6">
                {data.quiz.instruction || 'No instructions available'}
            </p>
            <div className="ml-auto mt-16 w-28">
                <PrimaryCTA text="Continue" onClick={() => setShowModal(true)} />
            </div>
            <ModalWrapper showModal={showModal} hideOnOverlayClick setShowModal={setShowModal}><StartQuizModal /></ModalWrapper>
        </>
    );
};

export default QuizLanding;
