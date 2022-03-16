/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PrimaryCTA from '@components/Buttons/PrimaryCTA'
// import UserQuizRegistration from '@pages/Register/UserQuizRegistration';
import { useGetQuiz } from '@api/quizzes/useQuizzes'
import { useGetScore, useUpdateScore } from '@api/quizzes/useScore'
import { PropTypes } from 'prop-types'
import RadioButton from '@components/Input/RadioGroup/RadioButton'
import TextField from '@components/Input/TextField'
import useCheckQuizStore from '@redux/store/zustand/checkQuiz'
import { useGetQuestion } from '@api/quizzes/useQuestions'

const mapQuizData = (data) => data?.data?.data?.quiz || {}

const QuestionsWrapper = () => {
  const { quizID } = useParams()

  const { data, isSuccess } = useGetQuiz(quizID)
  // const [showModal, setShowModal] = useState(false);

  const { setQuiz, currentQuestion, currentSection } = useCheckQuizStore()

  useEffect(() => {
    if (isSuccess) {
      const { name, description, sections } = mapQuizData(data)
      setQuiz({
        name,
        description,
        sections,
        quizioID: quizID,
      })
    }
  }, [isSuccess])

  // if (isLoading) return <div>Loading...</div>;

  // const { description, instruction } = mapQuizData(data);

  if (!currentQuestion) {
    return (
      <>
        <h1 className="text-3xl font-bold">
          Select a question to start checking.
        </h1>
      </>
    )
  }
  return (
    <>
      <h1 className="text-3xl font-bold">{currentSection}</h1>
      <Question />
    </>
  )
}

const Question = () => {
  const { currentQuestion, currentQuestionIndex } = useCheckQuizStore()
  const { participantID } = useParams()
  const {
    mutate,
    isLoading: saveLoading,
    isSuccess: saveSuccess,
  } = useUpdateScore()
  const checked = false
  const [questionData, setQuestionData] = useState({})
  const [marks, setMarks] = useState(0)
  const saveAndNext = () => {
    console.log('marks are : ', marks)
    mutate({
      questionID: currentQuestion,
      body: { marks, registrantID: participantID },
    })
  }
  const { data, isLoading, isSuccess } = useGetQuestion(currentQuestion)
  // console.log(currentQuestion);

  const {
    data: marksData,
    isLoading: marksLoading,
    isSuccess: marksSuccess,
  } = useGetScore(currentQuestion, participantID)

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      setQuestionData(data.data.data.question)
    }
  }, [isSuccess, isLoading, data])

  useEffect(() => {
    if (marksSuccess) {
      console.log(marksData, 'marksData')
    }
  }, [marksSuccess])

  if (isLoading) {
    return <>Loading...</>
  }
  return (
    <div>
      <div className="flex flex-row justify-between items-center py-4">
        <p className="text-black-N6 font-semibold">
          Question {currentQuestionIndex}
        </p>
        {checked ? (
          <div className="text-green-1 font-semibold bg-green-1 bg-opacity-25 p-1">
            Checked : 1/4
          </div>
        ) : (
          <div className="text-yellow-Y9 font-semibold bg-yellow-Y9 bg-opacity-25 p-1">
            Unchecked
          </div>
        )}
      </div>
      {questionData.type === 'mcq' ? (
        <MCQ
          questionText={questionData.question}
          options={questionData.choices}
          selected={0}
        />
      ) : (
        <Descriptive
          questionText={questionData.question}
          answer={questionData.answer}
        />
      )}

      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <p className="align-middle mr-2">
            Marks(out of{' '}
            {questionData.defaultMarks ? questionData.defaultMarks : 0})
          </p>
          <span>
            <TextField
              id="marks"
              placeholder="0"
              //   limit={2}
              val={marks}
              setVal={setMarks}
              additionalClassName="h-10 w-10"
            />
          </span>
          {marks === 0 && (
            <p className="align-middle px-2 text-purple-V6 cursor-pointer">
              Clear marks
            </p>
          )}
        </div>
        <div className="flex flex-row items-center">
          Checked by :{' '}
          <span className="text-purple-V6 cursor-pointer">Siddhu</span>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <span className="w-100">
          <PrimaryCTA text="Save and next" onClick={saveAndNext} />
        </span>
      </div>
      <p className="text-grey-N6">Checkers notes</p>
      <TextField
        id="notes"
        placeholder="Write notes"
        val={questionData.checkerNotes}
        setVal={() => {}}
      />
    </div>
  )
}

const MCQ = ({ questionText, options, selected }) => (
  <div>
    <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
    {options.map((choice, index) => (
      <div key={choice.quizioID}>
        <RadioButton
          text={choice.choice}
          onChange={() => {}}
          checked={selected === index}
          quizioID={choice.quizioID}
        />
      </div>
    ))}
  </div>
)

MCQ.propTypes = {
  questionText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.number.isRequired,
}

const Descriptive = ({ questionText, answer }) => (
  <div>
    <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
    <TextField
      id="DescriptiveAnswer"
      placeholder=""
      val={answer}
      setVal={() => {}}
    />
  </div>
)

Descriptive.propTypes = {
  questionText: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
}

export default QuestionsWrapper
