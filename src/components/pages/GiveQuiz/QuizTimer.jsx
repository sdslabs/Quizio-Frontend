import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { io } from 'socket.io-client';
import { timerURL } from '@config/config';
import { useParams } from 'react-router-dom';

const QuizTimer = () => {
  const { quizId } = useParams();

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    const getHours = (time) => Math.floor(time / 3600).toString();
    const getMinutes = (time) => Math.floor(time / 60).toString();
    const getSeconds = (time) => (time - getMinutes(time) * 60).toString();

    const socket = io(timerURL);

    socket.on('quizTimer', (quizzes) => {
      const { time } = _.find(quizzes, (quiz) => quiz.quizioID === quizId);

      setSeconds(getSeconds(time).padStart(2, '0'));
      setMinutes(getMinutes(time).padStart(2, '0'));
      setHours(getHours(time).padStart(2, '0'));

      if (time === 0) {
        socket?.disconnect();
      }
    });
  }, [quizId]);

  return (
      <div>
          {hours}
          {' '}
          :
          {' '}
          {minutes}
          {' '}
          :
          {' '}
          {seconds}
      </div>
  );
};

export default QuizTimer;
