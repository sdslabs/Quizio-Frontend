import React, { useEffect, useRef, useState } from 'react';

const Countdown = () => {
    const [countHours, setCountHours] = useState('00');
    const [countMinutes, setCountMinutes] = useState('00');
    const [countSeconds, setCountSecounds] = useState('00');

    let period = useRef();
    const timer = () => {
        const endTime = new Date('Januarary 22, 2022 00:00:00').getTime();
        const now = new Date().getTime();

        period = setInterval(() => {
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
        timer();
        return () => {
            clearInterval(period.current);
        };
    });
    return (
        <div>
            <p>
                {countHours}
                :
                {countMinutes}
                :
                {countSeconds}
            </p>
        </div>
    );
};
export default Countdown;
