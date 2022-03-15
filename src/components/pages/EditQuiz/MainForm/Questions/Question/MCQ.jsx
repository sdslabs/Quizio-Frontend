import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Select from 'react-select';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import RadioGroup from '@components/Input/RadioGroup';
import log from '@utils/log';

const MCQ = ({
 marks, setMarks, choices, setChoices,
}) => {
  const [mcqCount, setMcqCount] = useState(0); // checks to see max no. of options is less than 4
  const [answer, setAnswer] = useState('');

  const handleAddOption = () => {
    log('Add new choice');
    setMcqCount(mcqCount + 1);
    setChoices([
      ...choices,
      {
        choice: 'New Choice',
        marks: '0',
        quizioID: `quizioFrontend.${nanoid()}`,
      },
    ]);
  };

  const handleChange = (e) => {
    const answerID = e.value;
    setChoices(
      choices.map((choice) => (choice.quizioID === answerID
          ? { ...choice, marks: marks.toString() }
          : { ...choice, marks: '0' })),
    );
  };

  useEffect(() => {
    log('choices update:', { choices });
    setMcqCount(choices.length);
  }, [choices]);

  return (
      <div className="mcq-render">
          <div className="mcq-options ml-5">
              <RadioGroup
                choices={choices}
                setChoices={setChoices}
                editable
                setMcqCount={setMcqCount}
                mcqCount={mcqCount}
                setAnswer={setAnswer}
                answer={answer}
              />
              <div className="w-1/6 pb-6 pt-5">
                  {mcqCount < 4 && (
                  <SecondaryCTA text="+ Add Option" onClick={handleAddOption} />
          )}
              </div>
          </div>
          <hr className="rounded" color="grey" />
          <div className="question-marks flex justify-between">
              <div className="marks-text flex flex-row basis-1/2">
                  <div className="pt-8 pr-4">Marks:</div>
                  <TextField
                    id="question-marks"
                    placeholder="0"
                    setVal={setMarks}
                    val={marks.toString()}
                  />
              </div>

              <div className="flex items-center">
                  Update Answer (choose):
                  <Select
                    options={choices?.map((choice) => ({
              value: choice.quizioID,
              label: choice.choice,
            }))}
                    onChange={handleChange}
            //         value={
            //   choices?.find((choice) => choice.marks.toString() !== '0')?.quizioID
            // }
                    className="m-5"
                  />
              </div>
          </div>
      </div>
  );
};
MCQ.propTypes = {
  marks: PropTypes.string,
  setMarks: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  choices: PropTypes.array,
  setChoices: PropTypes.func,
};

MCQ.defaultProps = {
  marks: '0',
  setMarks: () => {},
  choices: [],
  setChoices: () => {},
};

export default MCQ;
