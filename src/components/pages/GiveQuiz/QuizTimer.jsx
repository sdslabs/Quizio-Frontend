import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { timerURL } from '@config/config';
import { useParams } from 'react-router-dom';

const QuizTimer = () => {
  const { quizId } = useParams();

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    const socket = io(timerURL);
    socket.on('quizTimer', (quizzes) => {
      const { time } = quizzes.find((quiz) => quiz.quizioID === quizId);

      const hours1 = Math.floor(time / 3600);
      const minutes1 = Math.floor(time / 60);
      const seconds1 = time - minutes1 * 60;

      setSeconds(
        seconds1 >= 10 ? seconds1.toString() : `0${seconds1.toString()}`,
      );
      setMinutes(
        minutes1 >= 10 ? minutes1.toString() : `0${minutes1.toString()}`,
      );
      setHours(hours1 >= 10 ? hours1.toString() : `0${hours1.toString()}`);
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
