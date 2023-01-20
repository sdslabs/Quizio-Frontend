import { useState } from 'react'
import { nanoid } from 'nanoid'
import Select from 'react-select'
import PropTypes from 'prop-types'
import TextField from '@components/Input/TextField'
import SecondaryCTA from '@components/Buttons/SecondaryCTA'
import RadioGroup from '@components/Input/RadioGroup'
import { find } from 'lodash'

const MCQ = ({ marks, setMarks, choices, setChoices }) => {
  const [answer, setAnswer] = useState('')

  const onAddNewOptionClick = () => {
    setChoices([
      ...choices,
      {
        choice: 'New Choice',
        marks: '0',
        quizioID: `quizioFrontend.${nanoid()}`,
      },
    ])
  }

  const handleChange = (e) => {
    const answerID = e.value
    setChoices(
      choices.map((choice) =>
        choice.quizioID === answerID
          ? { ...choice, marks: marks.toString() }
          : { ...choice, marks: '0' },
      ),
    )
  }

  const selectedChoice = find(choices, (choice) => choice.marks.toString() !== '0')

  return (
    <div className='mcq-render'>
      <div className='mcq-options ml-5'>
        <RadioGroup
          choices={choices}
          setChoices={setChoices}
          editable
          setAnswer={setAnswer}
          answer={answer}
        />
        <div className='w-1/6 pb-6 pt-5'>
          {choices.length < 4 && <SecondaryCTA text='+ Add Option' onClick={onAddNewOptionClick} />}
        </div>
      </div>
      <hr className='rounded' color='grey' />
      <div className='question-marks flex justify-between'>
        <div className='marks-text flex flex-row basis-1/2'>
          <div className='pt-8 pr-4'>Marks:</div>
          <TextField id='question-marks' placeholder='0' setVal={setMarks} val={marks.toString()} />
        </div>
        <div className='flex items-center'>
          Update Answer (choose):
          <Select
            options={choices?.map((choice) => ({
              value: choice.quizioID,
              label: choice.choice,
            }))}
            onChange={handleChange}
            className='m-5'
            value={{ value: selectedChoice?.quizioID, label: selectedChoice?.choice }}
          />
        </div>
      </div>
    </div>
  )
}
MCQ.propTypes = {
  marks: PropTypes.string,
  setMarks: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  choices: PropTypes.array,
  setChoices: PropTypes.func,
}

MCQ.defaultProps = {
  marks: '0',
  setMarks: () => {},
  choices: [],
  setChoices: () => {},
}

export default MCQ
