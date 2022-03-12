import React, { useState } from 'react';
import RadioGroup from '@components/Input/RadioGroup';

const Components = () => {
  const [selected, setSelected] = useState('');
  const [choices, setChoices] = useState([
    {
      choice: 'JS',
      quizioID: '1',
    },
    {
      choice: 'C++',
      quizioID: '2',
    },
    {
      choice: 'HTML',
      quizioID: '3',
    },
    {
      choice: 'C',
      quizioID: '4',
    },
  ]);

  return (
      <div className="w-screen min-h-screen flex flex-col">
          <h1>Radio Group!!!</h1>
          <hr />
          <RadioGroup
            choices={choices}
            selected={selected}
            setSelected={setSelected}
            setChoices={setChoices}
          />
          <hr />
          <hr />
      </div>
  );
};

export default Components;
