/* eslint-disable no-unused-vars */
import { useState } from 'react'
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';
import { ReactComponent as DeleteButton } from '@icons/delete_button.svg';
import _ from 'lodash';

const RadioButton = ({ text, quizioID, choices, setChoices, checked, onChange }) => {
  const [value, setValue] = useState(text)
  const handleChange = (e) => {
    setValue(e.target.value)
    const index = choices.findIndex((element) => element.quizioID === quizioID)
    const temp = [...choices]
    temp[index] = {
      choice: e.target.value,
      marks: 0,
      quizioID: temp[index].quizioID,
    }
    setChoices(temp)
  }

  const handleDelete = () => {
    const option = choices.find((element) => element.quizioID === quizioID)
    const temp = _.remove(choices, (e) => e !== option)
    setChoices(temp)
  }

  return (
    <div className='radio-button'>
      <input
        type='radio'
        value={quizioID}
        id={quizioID}
        checked={checked}
        onChange={onChange}
        className='radio-button-input'
      />
      <label htmlFor={quizioID} className='radio-button-label pr-2'>
        <input
          type='text'
          className='radio-button-text w-full'
          value={value}
          onChange={handleChange}
        />
      </label>
      <button type='button' className='w-6 h-6 m-2' onClick={handleDelete}>
        <DeleteButton />
      </button>
    </div>
  )
}

RadioButton.propTypes = {
  text: PropTypes.string,
  quizioID: PropTypes.string,
  setChoices: PropTypes.func,
  choices: PropTypes.arrayOf(
    PropTypes.shape({ quizioID: PropTypes.string, choice: PropTypes.string }),
  ),
  onChange: PropTypes.func,
  checked: PropTypes.bool,
}

RadioButton.defaultProps = {
  setChoices: () => {},
  onChange: () => {},
  checked: false,
  text: 'Radio Button',
  quizioID: '',
  choices: [
    {
      choice: '',
      quizioID: '',
    },
  ],
}

export default RadioButton;
