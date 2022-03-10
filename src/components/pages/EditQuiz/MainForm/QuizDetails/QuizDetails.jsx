import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import { useGetQuiz, useUpdateQuiz } from '@api/quizzes/useQuizzes';
import TextField from '@components/Input/TextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import useCreateQuizStore from '@store/zustand/createQuiz';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import DateTimeField from '@components/Input/DateTimeField';
import { checkIfEmailExists } from '@api/users/usersFetcher';
import '@pagestyles/create_quiz/quiz_details.scss';
import log from '@utils/log';

const QuizDetails = () => {
  const email = useSelector((state) => state.auth.user.email);
  const [quizName, setQuizName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [examDuration, setExamDuration] = useState('');
  const [owner, setOwner] = useState('');
  const [owners, setOwners] = useState(['']);
  const [accessCode, setAccessCode] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [quizInst, setQuizInst] = useState('');
  const [isDateTimeValid, setIsDateTimeValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const { setCurrentStage, currentID } = useCreateQuizStore();
  const {
    isSuccess: isUpdateSuccess,
    mutate: mutateQuizDetails,
  } = useUpdateQuiz();
  const { data, isSuccess } = useGetQuiz(currentID);

  const handleRemoveOwner = (i) => {
    const newOwners = [...owners];
    newOwners.splice(i, 1);
    setOwners(newOwners);
  };

  const handleAddOwner = async (e) => {
    const newOwners = [...owners];
    newOwners.push(owner);
    /* adds a new owner after the spacebar(32), enter(13) or comma(188) is pressed */
    if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 188) {
      if (owners.find((o) => o === owner)) {
        setEmailError('Already an owner!');
      } else {
        const isEmailValid = await checkIfEmailExists(owner);
        if (isEmailValid.success) {
          setOwner('');
          setOwners([...newOwners]);
        } else {
          setEmailError('Email not found!');
        }
      }
    }
  };

  const handleSubmit = () => {
    if (!isDateTimeValid) {
      console.error('Error with quiz time');
      return;
    }
    const quizId = new URLSearchParams(window.location.search).get('quizID');
    const quizDetails = {
      quizName,
      startDate,
      startTime,
      endDate,
      endTime,
      examDuration,
      owners,
      accessCode,
      quizDesc,
      quizInst,
      creator: email,
    };
    mutateQuizDetails({ quizId, body: quizDetails });
  };

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
      }
    }
  }, [startDate, startTime, endDate, endTime]);

  useEffect(() => {
    if (isUpdateSuccess) setCurrentStage('Registration form');
  }, [isUpdateSuccess]);

  useEffect(() => {
    setOwners([email]);
    log('quizData', data.quiz);
    setQuizName(data.quiz?.name);
  }, [isSuccess]);

  return (
      <div className="quiz-details">
          <div className="quiz-details-title">Quiz Details</div>
          <div className="quiz-details-name">
              <TextField
                id="quiz name"
                placeholder="Enter quiz name"
                label="Quiz Name"
                error=""
                limit={20}
                val={quizName}
                setVal={setQuizName}
              />
          </div>
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

          <div className="quiz-details-owners">
              <TextField
                id="Owners"
                placeholder="Add owners"
                label="Owners"
                error={emailError}
                helperText="Invalid email"
                val={owner}
                setVal={setOwner}
                onKeyDown={handleAddOwner}
              />
              <div className="quiz-details-owners-list">
                  {owners.map((currOwner, i) => (
                      <div key={nanoid()} className="quiz-details-owner">
                          <div className="quiz-details-owner-title">{currOwner}</div>
                          <button
                            type="button"
                            onClick={() => {
                  handleRemoveOwner(i);
                }}
                            className="quiz-details-owner-remove"
                          >
                              <CrossIcon />
                          </button>
                      </div>
          ))}
              </div>
          </div>
          <div className="quiz-details-access">
              <TextField
                id="Access Code"
                placeholder="Enter a quiz description"
                label="Access Code"
                error=""
                limit={15}
                val={accessCode}
                setVal={setAccessCode}
              />
          </div>
          <div className="quiz-details-description">
              <TextField
                id="Quiz Description"
                placeholder="Enter a quiz description"
                label="Quiz Description"
                error=""
                limit={150}
                val={quizDesc}
                setVal={setQuizDesc}
              />
          </div>
          <div className="quiz-details-instructions">
              <div className="text-sm text-grey-N6">Quiz Instructions</div>
              <div className="quiz-details-instructions-pagination">
                  {/* <button
                    type="button"
                    onClick={() => {
              setInstructionsMode('write');
            }}
                    className={
              instructionsMode === 'write'
                ? 'quiz-details-instructions-selected'
                : 'quiz-details-instructions-not-selected'
            }
                  >
                      Write
                  </button>
                  <button
                    type="button"
                    onClick={() => {
              setInstructionsMode('preview');
            }}
                    className={
              instructionsMode === 'preview'
                ? 'quiz-details-instructions-selected'
                : 'quiz-details-instructions-not-selected'
            }
                  >
                      Preview
                  </button> */}
              </div>
              <MarkdownTextField
                id="Quiz instruction"
                placeholder="Enter quiz instruction"
                error=""
                val={quizInst}
                setVal={setQuizInst}
                limit={1500}
              />
          </div>
          <div className="quiz-details-submit-container">
              <div className="quiz-details-submit">
                  <PrimaryCTA text="Save &amp; continue" onClick={handleSubmit} />
              </div>
          </div>
      </div>
  );
};
export default QuizDetails;
