/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import timerIcon from '@icons/timerIcon.svg';
import timerGreen from '@icons/timerGreenIcon.svg';
import Countdown from '@components/Misc/Countdown';
import { PropTypes } from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import { PieChart } from 'react-minimal-pie-chart';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useSubmitQuiz } from '@api/quizzes/useQuizzes';
import { useParams, useHistory } from 'react-router-dom';
import log from '@utils/log';

const Banner = ({ endTime, submitted }) => {
  if (submitted || new Date(endTime) < new Date()) {
    return (
        <div className="py-6 px-8 bg-green-1 bg-opacity-10 rounded flex">
            <img src={timerGreen} alt="" className="h-14 w-14 mr-6" />
            <div>
                <p className="text-xl text-green-1 font-semibold opacity-90">
                    {submitted ? 'Yay!' : "Time's up!"}
                </p>
                <p className="text-green-1 mt-1">
                    Your quiz has been
                    {' '}
                    <span className="font-semibold">successfully submitted</span>
                </p>
            </div>
        </div>
    );
  }

  return (
      <div className="py-6 px-8 bg-purple-V1 rounded flex">
          <img src={timerIcon} alt="" className="h-14 w-14 mr-6" />
          <div>
              <p className="text-xl text-purple font-semibold opacity-90">
                  You still have
                  {' '}
                  <Countdown time={endTime} />
                  {' '}
                  left
              </p>
              <p className="text-purple mt-1">Are you sure you want to submit ?</p>
          </div>
      </div>
  );
};

const SubmitQuiz = ({ setShowModal }) => {
  const {
    totalQuestions,
    answeredQuestions,
    markedQuestions,
    markedAnsweredQuestions,
    quiz,
  } = useGiveQuizStore();
  const { quizID } = useParams();
  const { mutate: submitQuiz, isSuccess: submitSucess } = useSubmitQuiz();

  const history = useHistory();
  useEffect(() => {
    if (submitSucess) {
      log('Quiz submitted!');
      history.push('/');
    }
  }, [submitSucess]);

  const handleSubmit = () => {
    log('Submit Quiz!', { quizID });
    submitQuiz({ quizID });
  };

  const data = [
    {
      title: 'Not visited',
      value:
        totalQuestions
        - (answeredQuestions?.length || 0)
        - (markedQuestions?.length || 0)
        - (markedAnsweredQuestions?.length || 0),
      color: '#AD9EC9',
    },
    {
      title: 'Answered questions',
      value: answeredQuestions?.length || 0,
      color: '#27A624',
    },
    {
      title: 'Marked for review',
      value: markedQuestions?.length || 0,
      color: '#FF8900',
    },
    {
      title: 'Answered and marked for review',
      value: markedAnsweredQuestions?.length || 0,
      color: '#604195',
    },
  ];
  return (
      <div className="py-6 px-8">
          <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-semibold">Submit Quiz</h1>
              <CrossIcon
                className="cursor-pointer"
                onClick={() => {
            setShowModal(false);
          }}
              />
          </div>
          <Banner endTime={quiz?.endTime} />
          <div className="flex mt-6 items-center">
              <div className="w-6/12">
                  <div className="w-52 mx-auto">
                      <PieChart
                        data={data}
                        radius={PieChart.defaultProps.radius - 2}
                        segmentsShift={1}
                      />
                  </div>
              </div>
              <div className="flex-grow">
                  <p className="text-lg mb-6">
                      Total number of questions:
                      {' '}
                      <span className="font-semibold">{totalQuestions}</span>
                  </p>
                  <div>
                      {data.map(({ title, value, color }) => (
                          <div key={title} className="flex my-3">
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                  <rect width="19" height="19" rx="4" fill={color} />
                              </svg>
                              <p className="text-sm ml-3">
                                  {title}
                                  :
                                  {' '}
                                  <span className="font-semibold">{value}</span>
                              </p>
                          </div>
            ))}
                  </div>
              </div>
          </div>
          <div className="flex justify-end mt-10">
              <div className="w-24">
                  <SecondaryCTA
                    text="Cancel"
                    onClick={() => {
              setShowModal(false);
            }}
                  />
              </div>
              <div className="w-24 ml-4">
                  <PrimaryCTA text="Submit" onClick={handleSubmit} />
              </div>
          </div>
      </div>
  );
};

Banner.propTypes = {
  endTime: PropTypes.string.isRequired,
  submitted: PropTypes.bool.isRequired,
};

export default SubmitQuiz;
