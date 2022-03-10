import React, { useEffect, useState } from 'react';
import Navbar from '@components/Navbar/Navbar';
import { useCreateQuiz } from '@api/quizzes/useQuizzes';
import { Redirect } from 'react-router-dom';
import ModalWrapper from '@components/Modals/ModalWrapper';
import SideNav from './SideNav/SideNav';
import MainForm from './MainForm/MainForm';
import '@pagestyles/create_quiz/index.scss';
import PublishQuizModal from './PublishQuizModal';

const CreateQuiz = () => {
    const search = new URLSearchParams(window.location.search);
    const quizID = search.get('quizID');
    const {
    mutate, data, isLoading, isSuccess,
    } = useCreateQuiz();

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!quizID) {
            mutate();
        }
    }, [quizID]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isSuccess && !quizID) return <Redirect to={{ pathname: '/quiz/create/', search: `?quizID=${data.data?.data?.quiz?.quizioID || ''}` }} />;

    return (
        <div className="create-quiz">
            <ModalWrapper
              showModal={showModal}
              hideOnOverlayClick
              setShowModal={setShowModal}
            >
                <PublishQuizModal setShowModal={setShowModal} />
            </ModalWrapper>
            <Navbar />
            <div className="create-quiz-main">
                <SideNav setShowModal={setShowModal} />
                <MainForm />
            </div>
        </div>
    );
};

export default CreateQuiz;
