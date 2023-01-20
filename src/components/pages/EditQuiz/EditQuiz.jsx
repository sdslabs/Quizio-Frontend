import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '@components/Navbar/Navbar'
import useCreateQuizStore from '@redux/store/zustand/createQuiz'
import { useGetQuiz } from '@api/quizzes/useQuizzes'
import SideNav from './SideNav'
import MainForm from './MainForm'
import '@pagestyles/create_quiz/index.scss'
import Loading from '../Loading'
import { toast } from 'react-toastify'

const EditQuiz = () => {
  const { quizID } = useParams()
  const setCurrentID = useCreateQuizStore((state) => state.setCurrentID)
  const setQuizData = useCreateQuizStore((state) => state.setQuizData)

  const { isSuccess, isLoading, data, isError } = useGetQuiz(quizID)

  useEffect(() => {
    if (isSuccess) {
      setQuizData(data)
    }
    if (isError) {
      toast.error('Error while fetching quiz')
    }
    setCurrentID(quizID)
  }, [quizID, isSuccess, isError, data])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="create-quiz">
          <Navbar />
            <div className="create-quiz-main">
              <SideNav
                quizID={quizID}
              />
              <MainForm />
            </div>
        </div>
      )}
    </>
  )
}

export default EditQuiz
