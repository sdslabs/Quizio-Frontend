import React from 'react';
import Navbar from '@components/Navbar/Navbar';
import SideNav from './SideNav';
import MainForm from './MainForm';
import '@pagestyles/create_quiz/index.scss';

const CreateQuiz = () => (
    <div className="create-quiz">
        <Navbar />
        <div className="create-quiz-main">
            <SideNav />
            <MainForm />
        </div>
    </div>
);

export default CreateQuiz;
