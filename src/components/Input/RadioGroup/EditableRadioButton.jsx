/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@styles/base/buttons.scss';
import { ReactComponent as DeleteButton } from '@icons/delete_button.svg';
import _ from 'lodash';

const RadioButton = ({
 text, /* onChange, */ quizioID, choices, setChoices, setMcqCount, mcqCount,
}) => {
    const [value, setValue] = useState(text);
    const handleChange = (e) => {
        setValue(e.target.value);
        const option = choices.find((element) => element.quizioID === quizioID);
        const index = choices.indexOf(option);
        const temp = choices;
        temp[index] = {
            choice: e.target.value,
            quizioID,
        };
        setChoices(temp);
    };
    // setValue(value);
    const handleDelete = () => {
        setMcqCount(mcqCount - 1);
        // setChoices(choices.pop(choices.find((choice) => choice.quizioID === quizioID)));
        const option = choices.find((element) => element.quizioID === quizioID);
        const index = choices.indexOf(option);
        const temp = _.remove(choices, (e) => e !== option);
        // console.log(temp);
        setChoices(temp);

        // const toChange = choices.find((element) => element.quizioID < 2);
        // console.log(toChange);

        // setChoices();
    };
        return (
            <div className="radio-button">
                <input
                  type="radio"
                  value={quizioID}
                  id={quizioID}
                  checked={false}
                    //   onChange={onChange}
                  className="radio-button-input"
                />
                <label htmlFor={quizioID} className="radio-button-label">
                    <input type="text" id={quizioID} className="radio-button-text w-auto" value={value} onChange={handleChange} />
                </label>
                <button type="button" className="w-6 h-6 m-2" onClick={handleDelete}>
                    <DeleteButton />
                </button>
            </div>
        );
    };

RadioButton.propTypes = {
  text: PropTypes.string,
//   onChange: PropTypes.func,
  quizioID: PropTypes.string,
//   checked: PropTypes.bool,
  setChoices: PropTypes.func,
  choices: PropTypes.arrayOf(PropTypes.shape({ quizioID: PropTypes.string, choice: PropTypes.string })),
  mcqCount: PropTypes.number.isRequired,
  setMcqCount: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
//   onChange: () => {},
  setChoices: () => {},
  text: 'Radio Button',
  quizioID: '',
//   checked: false,
  choices: [{
    choice: '',
    quizioID: '',
  }],
};

export default RadioButton;
