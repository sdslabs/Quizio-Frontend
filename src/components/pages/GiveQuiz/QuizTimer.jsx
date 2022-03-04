import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { timerURL } from '@config/config';

const QuizTimer = ({ quizID }) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    const socket = io(timerURL);
    socket.on('quizTimer', (quizzes) => {
      const { time } = quizzes.find((quiz) => quiz.quizioID === quizID);
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
    });

    socket.on('quizTimeEnd', (quizzes) => {
      setHours('00');
      setMinutes('00');
      setSeconds('00');
      console.log(quizzes.find((quiz) => quiz.quizioID === quizID).msg);
    });
  }, []);

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

QuizTimer.propTypes = {
  quizID: PropTypes.string.isRequired,
};

export default QuizTimer;
