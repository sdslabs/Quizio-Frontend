import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import LoadingPage from '@components/pages/Loading';
import '@pagestyles/dashboard/not_registered.scss';
import { useCreateQuiz } from '@api/quizzes/useQuizzes';
import log from '@utils/log';

const HostAQuiz = () => {
    const history = useHistory();
    const {
        mutate, data, isLoading, isSuccess,
    } = useCreateQuiz();

    const handleHostQuiz = () => {
        mutate();
    };

    useEffect(() => {
        if (data?.success) {
            const { quizioID } = data.data.quiz;
            history.push(`/quiz/edit/${quizioID}`);
        } else {
            log('Failed to create quiz!', data);
        }
    }, [isSuccess]);

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className="not-registered-container">
                    <div className="not-registered-title">Host a Quiz</div>
                    <div className="not-registered-content">No quizzes scheduled, why don&apos;t you host one</div>
                    <div className="not-registered-button">
                        <PrimaryCTA text="Host Quiz" onClick={handleHostQuiz} />
                    </div>
                </div>
            )}
        </>
    );
};
export default HostAQuiz;
