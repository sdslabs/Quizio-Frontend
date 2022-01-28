import React from 'react';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as QuizName } from '@icons/quizname.svg';

const QuizCard = () => (
    <div>
        <div className=" w-5/12 lg:max-w-full mb-4 m-4 lg:flex p-4 border border-purple-V1 rounded-lg">
            <div className="h-48 lg:h-auto lg:w-48 flex-none rounded bg-purple-V1">
                <div className="h-48 flex flex-col justify-center items-center">
                    <QuizName />
                    <h3 className="font-normal text-sm text-purple-V3 mt-0.5">Quiz Name</h3>
                </div>
            </div>
            <div className="w-full px-4 py-1.5 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                    <h1 className="text-2xl font-semibold mb-2">Recruitment Test</h1>
                    <p className="text-grey-N6 text-1xl">
                        This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.
                    </p>
                </div>
                <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-grey-N6 text-1xl">
                            Scheduled:
                            {' '}
                            <span className="text-black-1 text-1xl">26 Jun, 2021 03:00 PM</span>
                        </p>
                        <div className="w-32">
                            <PrimaryCTA additionalClassName="mt-4" text="Start Quiz" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default QuizCard;
