/* eslint-disable react/forbid-prop-types */
import { useEffect } from 'react'
import QuestionBubble from '@components/Visual/QuestionBubble';
import { ReactComponent as PlusIcon } from '@icons/plusIcon.svg';
import { PropTypes } from 'prop-types';
import useCreateQuizStore from '@store/zustand/createQuiz';
import { useAddQuestion } from '@api/quizzes/useQuestions';
import shallow from 'zustand/shallow'

const getStoreData = (state) => ({
  addQuestion: state.addQuestion,
  sections: state.sections,
  activeSectionIndex: state.activeSectionIndex,
  activeQuestion: state.activeQuestion,
  addQuestionToSection: state.addQuestionToSection,
  toggleQuestionForm: state.toggleQuestionForm,
  setActiveQuestion: state.setActiveQuestion,
  showQuestion: state.showQuestion,
  questionLength: state.question?.length ?? 0,
})

const QuestionBubbles = ({ isActive, questions }) => {
  const {
    addQuestion,
    sections,
    activeSectionIndex,
    addQuestionToSection,
    toggleQuestionForm,
    setActiveQuestion,
    activeQuestion,
    showQuestion,
    questionLength,
  } = useCreateQuizStore(getStoreData, shallow)

  const {
    data: addQuestionData,
    isLoading: isAddingQuestion,
    isSuccess: isAddedSuccessQuestion,
    mutate: mutateAddQuestion,
  } = useAddQuestion()

  const handleBubbleClick = (quesIDx) => {
    setActiveQuestion(quesIDx)
    toggleQuestionForm(true)
  }

  const handleAddNewQuestion = () => {
    const sectionID = sections[activeSectionIndex]?.id
    mutateAddQuestion({ sectionID })
    handleBubbleClick(questionLength)
  }

  useEffect(() => {
    if (isAddedSuccessQuestion) {
      const response = addQuestionData.data?.data?.question
      if (response) {
        addQuestionToSection(response.id)
        addQuestion(response)
      }
    }
  }, [isAddedSuccessQuestion, addQuestionData])

  if (isAddingQuestion) return <div>Loading Questions...</div>

  return (
    <div className={`side-nav-questions${isActive ? '-active' : ''}`}>
      {questions.map((question, quesIDx) => (
        <button
          onClick={() => handleBubbleClick(quesIDx)}
          key={question?.id || quesIDx}
          type='button'
        >
          <QuestionBubble
            number={quesIDx + 1}
            type={activeQuestion === quesIDx && showQuestion ? 'active' : 'not-visited'}
          />
        </button>
      ))}
      <button onClick={handleAddNewQuestion} type='button'>
        <PlusIcon />
      </button>
    </div>
  )
}

QuestionBubbles.propTypes = {
  isActive: PropTypes.bool.isRequired,
  questions: PropTypes.array.isRequired,
};

export default QuestionBubbles;
