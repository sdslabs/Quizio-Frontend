/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import RadioButton from '@components/Input/RadioGroup/RadioButton';

const MCQ = ({
  questionText, options, selected, setChoice,
 }) => (
     <div>
         <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
         {options.map((choice, index) => (
             <div key={choice.quizioID}>
                 <RadioButton
                   text={choice.choice}
                   onChange={(e) => {
             setChoice(e.target.value);
           }}
                   checked={selected === choice.quizioID}
                   quizioID={choice.quizioID}
                 />
             </div>
     ))}
     </div>
 );

 MCQ.propTypes = {
   questionText: PropTypes.string.isRequired,
   options: PropTypes.arrayOf(PropTypes.object).isRequired,
   selected: PropTypes.string,
   setChoice: PropTypes.func.isRequired,
 };

 MCQ.defaultProps = {
   selected: '',
 };

 export default MCQ;
