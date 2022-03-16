import React from 'react';
import TimerIcon from '@icons/timerIcon.svg';
import QuestionBubble from '@components/Visual/QuestionBubble';
import QuizTimer from '@pages/GiveQuiz/QuizTimer';

const QuestionBubbles = [
  {
    type: 'unattempted',
    number: 0,
    label: 'Unattempted',
  },
  {
    type: 'visited-unchecked',
    number: 0,
    label: 'Unchecked',
  },
  {
    type: 'checked',
    number: 0,
    label: 'Checked',
  },
  {
    type: 'autochecked',
    number: 0,
    label: 'Autochecked',
  },
];

const QuizBanner = () => (
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
            <div className="text-purple-V6 whitespace-nowrap">
                <QuizTimer />
            </div>
        </div>
    </div>
);

export default QuizBanner;
