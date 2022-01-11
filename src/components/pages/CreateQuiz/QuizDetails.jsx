import React, { useState } from 'react';
import '@pagestyles/create_quiz/quiz_details.scss';
import TextField from '@components/Input/TextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';

const QuizDetails = () => {
  const [instructionsMode, setInstructionsMode] = useState('write');
  const handleSubmit = () => {
    console.log('submit!');
  };

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
              />
          </div>
          <div className="quiz-details-datetime">
              <div className="quiz-details-start-date">
                  <TextField
                    id="Start Date"
                    placeholder="Select Start Date"
                    label="Start Date"
                    error=""
                  />
              </div>
              <div className="quiz-details-start-time">
                  <TextField
                    id="Start Time"
                    placeholder="Select start time"
                    label="Start Time"
                    error=""
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
                  />
              </div>
              <div className="quiz-details-end-time">
                  <TextField
                    id="End Time"
                    placeholder="Select end time"
                    label="End Time"
                    error=""
                  />
              </div>
              <div className="quiz-details-start-time">
                  <TextField
                    id="Exam Duration"
                    placeholder="Select exam duration"
                    label="Exam Duration"
                    error=""
                  />
              </div>
          </div>

          <div className="quiz-details-owners">
              <TextField
                id="Owners"
                placeholder="Add owners"
                label="Owners"
                error=""
                limit={15}
              />
          </div>
          <div className="quiz-details-access">
              <TextField
                id="Access Code"
                placeholder="Enter a quiz description"
                label="Access Code"
                error=""
                limit={15}
              />
          </div>
          <div className="quiz-details-description">
              <TextField
                id="Quiz Description"
                placeholder="Enter a quiz description"
                label="Quiz Description"
                error=""
                limit={150}
              />
          </div>
          <div className="quiz-details-instructions">
              <div className="text-sm text-grey-N6">Quiz Instructions</div>
              <div className="quiz-details-instructions-pagination">
                  <button
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
                  </button>
              </div>
              <TextField
                id="Quiz instruction"
                placeholder="Enter quiz instruction"
                error=""
              />
          </div>
          <div className="quiz-details-submit">
              <PrimaryCTA text="Save &amp; continue" onClick={handleSubmit} />
          </div>
      </div>
  );
};
export default QuizDetails;
