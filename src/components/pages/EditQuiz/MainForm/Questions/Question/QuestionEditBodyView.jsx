import PrimaryCTA from '@components/Buttons/PrimaryCTA'
import MarkdownTextField from '@components/Input/MarkdownTextField'
import useCreateQuizStore from '@redux/store/zustand/createQuiz'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import QuestionInputArea from './QuestionInputArea'
import useSaveQuestion from './utils/useSaveQuestion'

const QuestionEditBodyView = () => {
  const question = useCreateQuizStore((state) => state.currentQuestionData)
  const [questionText, setQuestionText] = useState('')
  const [choices, setChoices] = useState([])
  const [marks, setMarks] = useState(0)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (question) {
      setQuestionText(question.question)
      setChoices(question.choices)
      setMarks(question.marks)
      setNotes(question.checkerNotes)
    }
    return () => {
      setQuestionText('')
      setChoices([])
      setMarks(0)
      setNotes('')
    }
  }, [question])

  const questionBody = {
    id: question?.quizioID,
    question: questionText,
    checkerNotes: notes,
    maxMarks: marks,
    minMarks: '0',
  }

  const { onSave, isLoading, isSuccess } = useSaveQuestion(questionBody)

  useEffect(() => {
    if (isSuccess) {
      toast.success('Question Saved')
    }
  }, [isSuccess])

  return (
    <>
      <MarkdownTextField
        id='question-description'
        val={questionText}
        placeholder='Enter question here'
        setVal={setQuestionText}
      />
      <QuestionInputArea
        choices={choices}
        setChoices={setChoices}
        questionType={question?.type}
        marks={marks?.toString()}
        setMarks={setMarks}
        checkerNotes={notes}
        setCheckersNotes={setNotes}
      />
      <div className='w-40 ml-auto mt-8'>
        {isLoading ? (
          <PrimaryCTA text='Saving...' onClick={() => {}} disabled />
        ) : (
          <PrimaryCTA text='Save Changes' onClick={onSave} />
        )}
      </div>
    </>
  )
}

export default QuestionEditBodyView
