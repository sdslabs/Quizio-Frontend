import useCreateQuizStore from '@redux/store/zustand/createQuiz'
import QuestionView from './Question/QuestionView'
import SectionDescription from './SectionDescription'

const Questions = () => {
  const showQuestion = useCreateQuizStore((state) => state.showQuestion)

  return showQuestion ? <QuestionView /> : <SectionDescription />
}

export default Questions
