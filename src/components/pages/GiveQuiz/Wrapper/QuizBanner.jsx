import React, { useEffect } from 'react';
import TimerIcon from '@icons/timerIcon.svg';
import QuestionBubble from '@components/Visual/QuestionBubble';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import Countdown from '@components/Misc/Countdown';
import { useGetCurrentServerTime } from '@api/misc/useTime';
import dayjs from 'dayjs';
import log from '@utils/log';

const QuizBanner = () => {
  const {
    quiz,
    answeredQuestions,
    markedQuestions,
    markedAnsweredQuestions,
    totalQuestions,
  } = useGiveQuizStore();

  const QuestionBubbles = [
    {
      type: 'unanswered',
      number:
        totalQuestions
        - (markedQuestions?.length || 0)
        - (answeredQuestions?.length || 0)
        - (markedAnsweredQuestions?.length || 0),
      label: 'Unanswered',
    },
    {
      type: 'marked',
      number: markedQuestions?.length || 0,
      label: 'Marked for review',
    },
    {
      type: 'answered',
      number: answeredQuestions?.length || 0,
      label: 'Answered',
    },
    {
      type: 'marked-answered',
      number: markedAnsweredQuestions?.length || 0,
      label: 'Answered & Marked for review',
    },
  ];
  const { data, isSuccess } = useGetCurrentServerTime();
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    if (isSuccess) {
      log(data.data.data.serverTime);
      const timeOffset = dayjs() - dayjs(data.data.data.serverTime);
      log(timeOffset);
      setOffset(timeOffset);
    }
  }, [isSuccess]);
  return (
      <div className="border-b border-grey-N4 pl-10 flex items-stretch">
          <div className="flex flex-wrap flex-grow justify-center disable-hover">
              {QuestionBubbles.map(({ type, number, label }) => (
                  <div className="flex items-center my-3" key={label}>
                      <QuestionBubble key={type} type={type} number={number} />
                      <p className="ml-4 mr-10 text-sm">{label}</p>
                  </div>
        ))}
          </div>
          <div className="py-4 px-8 bg-purple-V1 flex items-center">
              <img src={TimerIcon} alt="" className="mr-2" />
              <p className="text-purple-V6 whitespace-nowrap">
                  <Countdown time={quiz?.endTime} offset={offset} />
              </p>
          </div>
      </div>
  );
};

export default QuizBanner;
