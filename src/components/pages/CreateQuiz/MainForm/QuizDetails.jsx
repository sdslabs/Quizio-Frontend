import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import TextField from '@components/Input/TextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import '@pagestyles/create_quiz/quiz_details.scss';
// import { useCreateQuiz } from '@api/quizzes/useQuizzes';
import useCreateQuizStore from '@store/zustand/createQuiz';
import { nanoid } from 'nanoid';
// useGetQuiz
import { useUpdateQuiz } from '@api/quizzes/useQuizzes';
import MarkdownTextField from '@components/Input/MarkdownTextField';

const QuizDetails = () => {
  const email = useSelector((state) => state.auth.user.email);
  // const [instructionsMode, setInstructionsMode] = useState('write');
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
  const { setCurrentStage } = useCreateQuizStore();
  let emailCheck = 'Invalid Email';

  const handleRemoveOwner = (i) => {
    const newOwners = [...owners];
    newOwners.splice(i, 1);
    setOwners(newOwners);
  };

  // const handleAddOwner = async (e) => {
  //   if (e.key === 'Enter') {
  //     const res = await checkIfUserExists(owner);
  //     if (res.success) {
  //         const newOwners = new Set(owners);
  //         newOwners.add(owner);
  //         setOwners([...newOwners]);
  //     }
  //   }
  // };

  const emailValidation = async () => {
    emailCheck = true;
    console.log('yaas');
  };

  const handleAddOwner = async (e) => {
    console.log(e.keyCode);
    const newOwners = [...owners];
    newOwners.push(owner);
    /* adds a new owner after the spacebar is pressed */
      if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 188) {
        setOwner('');
        console.log(newOwners);
        setOwners([...newOwners]);
      }
  };

  const { isSuccess: isUpdateSuccess, mutate: mutateQuizDetails, data } = useUpdateQuiz();
  // const { isSuccess: isGetSuccess, data} = useGetQuiz();
// console.log(data);
  const handleSubmit = () => {
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
    console.log(data);
    mutateQuizDetails({ quizId, body: quizDetails });

    // const res = await createQuiz({
    //   quizName,
    //   startDate,
    //   startTime,
    //   endDate,
    //   endTime,
    //   examDuration,
    //   owners,
    //   accessCode,
    //   quizDesc,
    //   quizInst,
    //   creator: email,
    // });

    // if (res.success) {
    //   dispatch(setCreateQuizId(res.data.quiz.quizId));
    //   dispatch(setCreateQuizStage('Registration form'));
    // }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      setCurrentStage('Registration form');
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    setOwners([email]);
  }, []);

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
                  <TextField
                    type="date"
                    id="Start Date"
                    placeholder="Select Start Date"
                    label="Start Date"
                    error=""
                    val={startDate}
                    setVal={setStartDate}
                  />
              </div>
              <div className="quiz-details-start-time">
                  <TextField
                    id="Start Time"
                    placeholder="Select start time"
                    label="Start Time"
                    error=""
                    val={startTime}
                    setVal={setStartTime}
                  />
              </div>
          </div>

          <div className="quiz-details-datetime">
              <div className="quiz-details-start-date">
                  <TextField
                    id="End Date"
                    placeholder="Select end date"
                    label="End Date"
                    error=""
                    val={endDate}
                    setVal={setEndDate}
                  />
              </div>
              <div className="quiz-details-end-time">
                  <TextField
                    id="End Time"
                    placeholder="Select end time"
                    label="End Time"
                    error=""
                    val={endTime}
                    setVal={setEndTime}
                  />
              </div>
              <div className="quiz-details-start-time">
                  <TextField
                    id="Exam Duration"
                    placeholder="Select exam duration"
                    label="Exam Duration"
                    error=""
                    val={examDuration}
                    setVal={setExamDuration}
                  />
              </div>
          </div>

          <div className="quiz-details-owners">
              <TextField
                id="Owners"
                placeholder="Add owners"
                label="Owners"
                error={emailCheck}
                helperText="Invalid email"
                onChange={emailValidation}
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
