import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; 
import dayjs from 'dayjs';
import log  from '@utils/log';
import { useHistory, useParams } from 'react-router-dom';
import { useSubmitQuiz } from '@api/quizzes/useQuizzes';

// Make sure time - now < 24hrs
const Countdown = ({ time, offset }) => {
  const period = useRef();
  const { quizID } = useParams();

  const history = useHistory();
  const [countHours, setCountHours] = useState('99');
  const [countMinutes, setCountMinutes] = useState('99');
  const [countSeconds, setCountSecounds] = useState('99');
  const { mutate: submitQuiz, isSuccess: submitSucess } = useSubmitQuiz();

  const startCountdownTimer = () => {
    const endTime = dayjs(time);
    const now = dayjs().subtract(offset);

    period.current = setInterval(() => {
      const duration = endTime - now;
      const seconds = Math.floor((duration / 1000) % 60);
      const minutes = Math.floor((duration / 1000 / 60) % 60);
      const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      if (duration < 0) {
        clearInterval(period.current);
      } else {
        setCountHours(hours);
        setCountMinutes(minutes);
        setCountSecounds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startCountdownTimer();
    return () => clearInterval(period.current);
  });

  useEffect(() => {
    log('Countdown', { countHours, countMinutes, countSeconds })
    if(countHours == '0' && countMinutes == '0' && countSeconds == '1'){
      log('Submit Quiz!', { quizID });
      submitQuiz({ quizID });
    }
  }, [countHours, countMinutes, countSeconds]);

  useEffect(() => {
    if (submitSucess) {
      log('Quiz submitted!');
      history.push(`/?submitted=${quizID}`);
    }
  }, [submitSucess]);

  if(countHours == '99' && countMinutes == '99' && countMinutes == '99'){
    return <span>Loading...</span>
  }
  return (
      <span>
          {`${countHours
        .toString()
        .padStart(2, '0')} : ${countMinutes
        .toString()
        .padStart(2, '0')} : ${countSeconds.toString().padStart(2, '0')}`}
      </span>
  );
};

Countdown.propTypes = {
  time: PropTypes.string,
  offset: PropTypes.number.isRequired,
};

Countdown.defaultProps = {
  time: '0',
};

export default Countdown;

