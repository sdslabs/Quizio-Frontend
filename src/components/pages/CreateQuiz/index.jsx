import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import log from '@utils/log';
import SideNav from './SideNav';
import MainForm from './MainForm';
import '@pagestyles/create_quiz/index.scss';

const CreateQuiz = () => {
    const search = new URLSearchParams(window.location.search);
    log(search);
    // const quizID = search.get('quizID');

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
