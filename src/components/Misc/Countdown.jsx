import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Make sure time - now < 24hrs
const Countdown = ({ time }) => {
  const period = useRef();

  const [countHours, setCountHours] = useState('00');
  const [countMinutes, setCountMinutes] = useState('00');
  const [countSeconds, setCountSecounds] = useState('00');

  const startCountdownTimer = () => {
    // TODO: use dayjs
    const endTime = new Date(time).getTime();
    const now = new Date().getTime();

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

  return <span>{`${countHours} : ${countMinutes} : ${countSeconds}`}</span>;
};

Countdown.propTypes = {
  time: PropTypes.string,
};

Countdown.defaultProps = {
  time: '0',
};

export default Countdown;
