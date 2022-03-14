import React, { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import RadioGroup from '@components/Input/RadioGroup';

const MCQ = ({
 marks, setMarks, mcqChoice, setMcqChoice,
}) => {
  const [mcqCount, setMcqCount] = useState(0); // checks to see max no. of options is less than 4

  const handleAddOption = () => {
    setMcqCount(mcqCount + 1);
    setMcqChoice([...mcqChoice, { choice: 'New Option' }]);
  };

  return (
      <div className="mcq-render">
          <div className="mcq-options ml-5">
              <RadioGroup
                choices={mcqChoice}
                editable
                setMcqCount={setMcqCount}
                mcqCount={mcqCount}
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

              <div className="mcq-ans pt-8 inline-flex">
                  Answer:
                  <Select
                    options={[
              { value: 'JS', label: 'JS' },
              { value: 'c++', label: 'C++' },
              { value: 'html', label: 'HTML' },
            ]}
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
  mcqChoice: PropTypes.array,
  setMcqChoice: PropTypes.func,
};

MCQ.defaultProps = {
  marks: '0',
  setMarks: () => {},
  mcqChoice: [],
  setMcqChoice: () => {},
};

export default MCQ;
