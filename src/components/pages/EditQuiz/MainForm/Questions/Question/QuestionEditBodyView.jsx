import PrimaryCTA from '@components/Buttons/PrimaryCTA'
import SecondaryCTA from '@components/Buttons/SecondaryCTA'
import MarkdownTextField from '@components/Input/MarkdownTextField'
import useCreateQuizStore from '@redux/store/zustand/createQuiz'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import QuestionInputArea from './QuestionInputArea'
import useSaveQuestion from './utils/useSaveQuestion'
import { useHistory } from 'react-router-dom'

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
      setMarks(question.maxMarks)
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
    choices,
    type: question?.type,
  }

  const { onSave, isLoading, isSuccess } = useSaveQuestion(questionBody)

  useEffect(() => {
    if (isSuccess) {
      toast.success('Question Saved')
    }
  }, [isSuccess])

  const history = useHistory()
  const onDiscardChanges = () => {
    history.go(0)
  }

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
      <div className='w-80 ml-auto mt-8 flex gap-2'>
        <SecondaryCTA text='Discard Changes' onClick={onDiscardChanges} />
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
