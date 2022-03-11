import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import DateTimeField from '@components/Input/DateTimeField';
import TextField from '@components/Input/TextField';
import log from '@utils/log';

const DateTimeInput = ({
  setIsDateTimeValid,
  setStartDateTime,
  setEndDateTime,
}) => {
  // TODO: Error rendering
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [examDuration, setExamDuration] = useState('');

  const handleStartDate = (e) => setStartDate(e.target.value);

  const handleStartTime = (e) => setStartTime(e.target.value);

  const handleEndDate = (e) => setEndDate(e.target.value);

  const handleEndTime = (e) => setEndTime(e.target.value);

  useEffect(() => {
    if (startDate && startTime && endDate && endTime) {
      const [startYear, startMonth, startDay] = startDate.split('-');
      const [endYear, endMonth, endDay] = endDate.split('-');

      const [startHour, startMinute] = startTime.split(':');
      const [endHour, endMinute] = endTime.split(':');

      const start = new Date(startYear, startMonth - 1, startDay);
      const end = new Date(endYear, endMonth - 1, endDay);
      const now = new Date();
      start.setHours(startHour);
      start.setMinutes(startMinute);
      end.setHours(endHour);
      end.setMinutes(endMinute);

      const startDayJS = dayjs(start);
      const endDayJS = dayjs(end);
      const nowDayJS = dayjs(now);

      const isValid = startDayJS.isAfter(nowDayJS) && endDayJS.isAfter(startDayJS);
      if (!isValid) {
        setIsDateTimeValid(false);
      } else {
        let totalSeconds = endDayJS.diff(startDayJS, 'seconds');
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        minutes = String(minutes).padStart(2, '0');
        hours = String(hours).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        setExamDuration(`${hours} : ${minutes} : ${seconds}`);

        setStartDateTime(startDayJS.toISOString());
        setEndDateTime(endDayJS.toISOString());

        log({
          startTime: startDayJS.toISOString(),
          endTime: endDayJS.toISOString(),
        });
      }
    }
  }, [startDate, startTime, endDate, endTime]);

  return (
      <>
          <div className="quiz-details-datetime">
              <div className="quiz-details-start-date">
                  <DateTimeField
                    type="date"
                    id="Start Date"
                    placeholder="Select Start Date"
                    label="Start Date"
                    error=""
                    val={startDate}
                    setVal={setStartDate}
                    onChange={handleStartDate}
                  />
              </div>
              <div className="quiz-details-start-time">
                  <DateTimeField
                    type="time"
                    id="Start Time"
                    placeholder="Select start time"
                    label="Start Time"
                    error=""
                    val={startTime}
                    setVal={setStartTime}
                    onChange={handleStartTime}
                  />
              </div>
          </div>
          <div className="quiz-details-datetime">
              <div className="quiz-details-start-date">
                  <DateTimeField
                    type="date"
                    id="End Date"
                    placeholder="Select end date"
                    label="End Date"
                    error=""
                    val={endDate}
                    setVal={setEndDate}
                    onChange={handleEndDate}
                  />
              </div>
              <div className="quiz-details-end-time">
                  <DateTimeField
                    type="time"
                    id="End Time"
                    placeholder="Select end time"
                    label="End Time"
                    error=""
                    val={endTime}
                    setVal={setEndTime}
                    onChange={handleEndTime}
                  />
              </div>
              <div className="quiz-details-start-time">
                  <TextField
                    id="Exam Duration"
                    disabled
                    placeholder="Exam duration"
                    label="Exam Duration"
                    error=""
                    val={examDuration}
                  />
              </div>
          </div>
      </>
  );
};

DateTimeInput.propTypes = {
  setIsDateTimeValid: PropTypes.func,
  setStartDateTime: PropTypes.func,
  setEndDateTime: PropTypes.func,
};

DateTimeInput.defaultProps = {
  setIsDateTimeValid: () => {},
  setStartDateTime: () => {},
  setEndDateTime: () => {},
};

export default DateTimeInput;
