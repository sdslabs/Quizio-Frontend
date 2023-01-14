import useCreateQuizStore from '@redux/store/zustand/createQuiz'
import Title from './Title'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useToggleQuestionType } from '@api/quizzes/useQuestions'

const questionTypeValueMap = {
  mcq: { value: 'mcq', label: 'Multiple Choice' },
  subjective: { value: 'subjective', label: 'Subjective' },
}

const questionTypes = Object.keys(questionTypeValueMap).map((k) => questionTypeValueMap[k])

const QuestionViewHeader = () => {
  const question = useCreateQuizStore((state) => state.currentQuestionData)
  const setQuestionData = useCreateQuizStore((state) => state.setQuestionData)
  const activeQuestionIdx = useCreateQuizStore((state) => state.activeQuestion)
  const [questionType, setQuestionType] = useState(null)

  const { isLoading: isToggleLoading, mutate: mutateToggleQuestion } = useToggleQuestionType()

  const onToggleChange = (newType) => {
    if (questionType.value !== newType.value) {
      mutateToggleQuestion({ questionID: question.quizioID })
      setQuestionType(newType)
      setQuestionData({ ...question, type: newType.value })
    }
  }

  useEffect(() => {
    if (question?.type) {
      setQuestionType(questionTypeValueMap[question.type])
    }
  }, [question?.type])

  return (
    <div className='question-type-dropdown flex w-full justify-between'>
      <Title activeQuestion={activeQuestionIdx} />
      <div className='flex items-center'>
        Change question type (choose):
        {isToggleLoading ? (
          <p>Loading...</p>
        ) : (
          <Select
            options={questionTypes}
            onChange={onToggleChange}
            value={questionType}
            className='text-sm p-5 w-200'
          />
        )}
      </div>
    </div>
  )
}

export default QuestionViewHeader
