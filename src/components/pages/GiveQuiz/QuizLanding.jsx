import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import log from '@utils/log';

const QuizLanding = () => {
    const { quizID } = useParams();
    const {
 data, isLoading, isSuccess, sections,
} = useGetQuiz(quizID);
    const history = useHistory();
    const { setQuiz } = useGiveQuizStore();

    useEffect(() => {
        if (isSuccess) {
            log({ quizData: data });
            setQuiz({
                name: data.quiz.name,
                description: data.quiz.description,
                sections: data.quiz.sections,
                quizioID: quizID,
                startTime: data.quiz.startTime,
                endTime: data.quiz.endTime,
            });
            /*
            let totalQuestions = 0;
            console.log(data);
            data.quiz.sections.forEach((section) => {
                section.questions.forEach(() => { totalQuestions += 1; });
            });
            setTotalQuestions(totalQuestions); */
        }
    }, [isSuccess]);

    useEffect(() => {
        log('quizlanding', { quizID });
    }, [quizID]);

    const handleContinue = () => {
        log(sections);
        history.push(`/quiz/attempt/${quizID}/${data?.quiz?.sections[0]}`);
    };

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
                <PrimaryCTA text="Continue" onClick={handleContinue} />
            </div>
        </>
    );
};

export default QuizLanding;
