/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import QuestionBubble from '@components/Visual/QuestionBubble';
import { ReactComponent as PlusIcon } from '@icons/plusIcon.svg';
import { PropTypes } from 'prop-types';
import useCreateQuizStore from '@store/zustand/createQuiz';
import { useAddQuestion } from '@api/quizzes/useQuestions';

const Questions = ({ isActive, questions }) => {
    const {
 addQuestion, sections, activeSectionIndex, addQuestionToSection,
} = useCreateQuizStore();
    const sectionId = sections[activeSectionIndex]?.id;

    const {
    data, isLoading, isSuccess, mutate: mutateAddQuestion,
    } = useAddQuestion();

    const handleAddNewQuestion = () => {
        mutateAddQuestion({ sectionId });
    };

    const handleBubbleClick = () => {};

   useEffect(() => {
    if (isSuccess) {
        const response = data.data?.data?.question;
        if (response) {
            addQuestionToSection(response.id);
            addQuestion(response);
        }
    }
   }, [isSuccess, data]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={`side-nav-questions${isActive ? '-active' : ''}`}>
            {questions.map((question, quesIdx) => (
                <button onClick={handleBubbleClick} key={question?.id || quesIdx} type="button">
                    <QuestionBubble number={quesIdx + 1} type="not-visited" />
                </button>
            ))}
            <button onClick={handleAddNewQuestion} type="button">
                <PlusIcon />
            </button>
        </div>
    );
};

Questions.propTypes = {
    isActive: PropTypes.bool.isRequired,
    questions: PropTypes.array.isRequired,
};

export default Questions;
