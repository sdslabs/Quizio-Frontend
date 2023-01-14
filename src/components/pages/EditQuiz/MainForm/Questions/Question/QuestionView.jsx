import { useGetQuestionWithoutCache } from '@api/quizzes/useQuestions'
import Loading from '@components/pages/Loading'
import useCreateQuizStore from '@redux/store/zustand/createQuiz'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import QuestionEditBodyView from './QuestionEditBodyView'
import QuestionViewHeader from './QuestionViewHeader'

const QuestionView = () => {
  const activeQuestionID = useCreateQuizStore(
    (state) => state.sections[state.activeSectionIndex]?.questions[state.activeQuestion],
  )
  const currentSectionTitle = useCreateQuizStore(
    (state) => state.sections[state.activeSectionIndex]?.title ?? '',
  )
  const setQuestionData = useCreateQuizStore((state) => state.setQuestionData)
  const resetQuestionData = useCreateQuizStore((state) => state.resetQuestionData)

  const { data, isSuccess, isLoading, isError } = useGetQuestionWithoutCache(activeQuestionID)
  const questionData = data?.data?.data?.question

  useEffect(() => {
    if (isError) {
      toast.error('Error while fetching question data')
    }
    if (isSuccess) {
      setQuestionData(questionData)
    }
  }, [isSuccess, isError, activeQuestionID])

  useEffect(() => {
    return resetQuestionData
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return null
  }

  return (
    <div className='quiz-details w-full'>
      <div className='font-bold text-3xl'>{currentSectionTitle}</div>
      <div className='quiz-question w-full'>
        <QuestionViewHeader />
        <QuestionEditBodyView />
      </div>
    </div>
  )
}

export default QuestionView
