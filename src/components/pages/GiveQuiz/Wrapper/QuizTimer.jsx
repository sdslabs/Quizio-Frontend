import React, { useEffect, useRef, useState } from 'react';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';

const QuizTimer = () => {
  const { quiz } = useGiveQuizStore();
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const period = useRef();
  const startCountdownTimer = () => {
    const endTime = new Date(quiz?.endTime).getTime();
    const now = new Date().getTime();

    period.current = setInterval(() => {
        const duration = endTime - now;
        const pseconds = Math.floor((duration / 1000) % 60);
        const pminutes = Math.floor((duration / 1000 / 60) % 60);
        const phours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        console.log(pseconds, pminutes, phours);
        if (duration < 0) {
            clearInterval(period.current);
        } else {
          setHours(phours);
          setMinutes(pminutes);
          setSeconds(pseconds);
        }
    }, 1000);
};
useEffect(() => {
  startCountdownTimer();
  return () => {
      clearInterval(period.current);
  };
});

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
