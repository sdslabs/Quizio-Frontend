import React, { useState } from 'react';
import RadioGroup from '@components/Input/RadioGroup';

const Components = () => {
  const choices = [
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
  ];

  const [selected, setSelected] = useState('');

  return (
      <div className="w-screen min-h-screen flex flex-col">
          <h1>Radio Group!!!</h1>
          <hr />
          <RadioGroup
            choices={choices}
            selected={selected}
            setSelected={setSelected}
          />
          <hr />
          <hr />
      </div>
  );
};

export default Components;
