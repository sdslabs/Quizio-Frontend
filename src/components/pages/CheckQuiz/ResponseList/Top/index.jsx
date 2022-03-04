import React, { useEffect, useState } from 'react';
import '@pagestyles/check_quiz/top.scss';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useGetRegistrants } from '@api/register/useRegister';
import { useParams } from 'react-router-dom';

const Top = () => {
    const { quizID } = useParams();
    const [quizName, setQuizName] = useState('');
    const [creator, setCreator] = useState('');
    const [createdOn, setCreatedOn] = useState('');
    const [totalParticipants, setTotalParticipants] = useState(1);
    const { data: quizData, isLoading: isQuizLoading, isSuccess: isQuizSuccess } = useGetQuiz(quizID);
    const { data: registrantsData, isLoading: isRegistrantsLoading, isSuccess: isRegistrantsSuccess } = useGetRegistrants(quizID);
    useEffect(() => {
        if (isQuizSuccess) {
            setQuizName(quizData.data.data.quiz.name);
            setCreator(quizData.data.data.quiz.creator);
            const date = new Date(quizData.data.data.quiz.startTime);
            const options = {
            year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
            };
            setCreatedOn(date.toLocaleDateString('en-US', options));
        }
     }, [isQuizSuccess]);

    useEffect(() => {
        if (isRegistrantsSuccess) {
            setTotalParticipants(registrantsData.data.data.users.length);
        }
      }, [isRegistrantsSuccess]);

    if (isQuizLoading || isRegistrantsLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="dashboard-top">
            <div className="quiz-details-container">
                <div className="quiz-details-title">{quizName}</div>
                <div className="quiz-details-content">
                    Scheduled on
                    {' '}
                    {createdOn}
                </div>
                <div className="quiz-details-content">
                    Created by:
                    {' '}
                    <span className="content-link">{creator}</span>
                </div>
                <div className="quiz-details-content">
                    Result published by:
                    {' '}
                    <span className="content-link">Angad Kambli</span>
                    , 10th February, 2022, XX:XX PM
                </div>
            </div>
            <div className="participants-container">
                <div className="participants-count">{totalParticipants}</div>
                <div className="participants-text">Total</div>
                <div className="participants-text"> Participants</div>
            </div>
            <div className="checks-container">
                <div className="checks-count">1000</div>
                <div className="checks-text">Checks</div>
                <div className="checks-text">Completed</div>
            </div>
        </div>
  );
};

export default Top;
