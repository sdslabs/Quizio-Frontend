/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import QuestionBubble from '@pages/GiveQuiz/QuestionBubble';
import { ReactComponent as PlusIcon } from '@icons/plusIcon.svg';
import { PropTypes } from 'prop-types';
import useCreateQuizStore from '@store/zustand/createQuiz';
import { useAddQuestion } from '@api/quizzes/useQuestions';
import log from '@utils/log';

const QuestionBubbles = ({ isActive, questions }) => {
  const {
    addQuestion,
    sections,
    activeSectionIndex,
    addQuestionToSection,
    toggleQuestionForm,
    setActiveQuestion,
  } = useCreateQuizStore();
  const sectionID = sections[activeSectionIndex]?.id;

  const {
    data,
    isLoading,
    isSuccess,
    mutate: mutateAddQuestion,
  } = useAddQuestion();

  const handleAddNewQuestion = () => {
    mutateAddQuestion({ sectionID });
  };

  const handleBubbleClick = (quesIDx) => {
      log('Bubble clicked!', { quesIDx, activeSectionIndex, sections });
      setActiveQuestion(quesIDx);
      toggleQuestionForm(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const response = data.data?.data?.question;
      if (response) {
        addQuestionToSection(response.id);
        addQuestion(response);
      }
    }
  }, [isSuccess, data]);

  if (isLoading) return <div>Loading Questions...</div>;

  return (
      <div className={`side-nav-questions${isActive ? '-active' : ''}`}>
          {questions.map((question, quesIDx) => (
              <button
                onClick={() => handleBubbleClick(quesIDx)}
                key={question?.id || quesIDx}
                type="button"
              >
                  <QuestionBubble number={quesIDx + 1} type="not-visited" />
              </button>
      ))}
          <button onClick={handleAddNewQuestion} type="button">
              <PlusIcon />
          </button>
      </div>
  );
};

QuestionBubbles.propTypes = {
  isActive: PropTypes.bool.isRequired,
  questions: PropTypes.array.isRequired,
};

export default QuestionBubbles;
