import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@components/Navbar/Navbar';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import log from '@utils/log';
import SideNav from './SideNav';
import MainForm from './MainForm';
import '@pagestyles/create_quiz/index.scss';
import Loading from '../Loading';

const EditQuiz = () => {
    const { quizID } = useParams();
    const { setCurrentID } = useCreateQuizStore();
    const { isLoading } = useGetQuiz(quizID, '');

    useEffect(() => {
        log({ quizID });
        setCurrentID(quizID);
    }, [quizID]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="create-quiz">
                    <Navbar />
                    <div className="create-quiz-main">
                        <SideNav />
                        <MainForm />
                    </div>
                </div>
            )}
        </>
    );
};

export default EditQuiz;
