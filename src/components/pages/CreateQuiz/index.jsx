import React, { useEffect } from 'react';
import Navbar from '@components/Navbar/Navbar';
import { useCreateQuiz } from '@api/quizzes/useQuizzes';
import { Redirect } from 'react-router-dom';
import SideNav from './SideNav';
import MainForm from './MainForm';
import '@pagestyles/create_quiz/index.scss';

const CreateQuiz = () => {
    const search = new URLSearchParams(window.location.search);
    const quizID = search.get('quizID');
    const {
    mutate, data, isLoading, isSuccess,
    } = useCreateQuiz();

    useEffect(() => {
        if (!quizID) {
            mutate();
        }
    }, [quizID]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isSuccess) return <Redirect to={{ pathname: '/quiz/create/', search: `?quizID=${data.data?.data?.quiz?.quizioID || ''}` }} />;

    return (
        <div className="create-quiz">
            <Navbar />
            <div className="create-quiz-main">
                <SideNav />
                <MainForm />
            </div>
        </div>
    );
};

export default CreateQuiz;
