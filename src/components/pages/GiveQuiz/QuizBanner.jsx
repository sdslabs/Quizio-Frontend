import React from 'react';
import TimerIcon from '@icons/timerIcon.svg';
import QuestionBubble from '@pages/GiveQuiz/QuestionBubble';

const QuestionBubbles = [
    {
        type: 'not-visited',
        number: 0,
        label: 'Not visited',
    },
    {
        type: 'marked',
        number: 24,
        label: 'Marked for review',
    },
    {
        type: 'answered',
        number: 12,
        label: 'Answered',
    },
    {
        type: 'marked-answered',
        number: 55,
        label: 'Answered & Marked for review',
    },
];

const QuizBanner = () => (
    <div className="border-b border-grey-N4 pl-10 flex items-stretch">
        <div className="flex flex-wrap flex-grow justify-center disable-hover">
            {QuestionBubbles.map(({ type, number, label }) => (
                <div className="flex items-center my-3">
                    <QuestionBubble
                      key={type}
                      type={type}
                      number={number}
                    />
                    <p className="ml-4 mr-10 text-sm">{label}</p>
                </div>
            ))}
        </div>
        <div className="py-4 px-8 bg-purple-V1 flex items-center">
            <img src={TimerIcon} alt="" className="mr-2" />
            <p className="text-purple-V6 whitespace-nowrap">00 : 00 : 00</p>
        </div>
    </div>
    );

export default QuizBanner;
