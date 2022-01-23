import React from 'react';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import timerIcon from '@icons/timerIcon.svg';
import timerGreen from '@icons/timerGreenIcon.svg';
import Countdown from '@components/pages/CreateQuiz/SideNav/Countdown';
import { PropTypes } from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import { PieChart } from 'react-minimal-pie-chart';

const dummyData = [
    {
        title: 'Not visited',
        value: 20,
        color: '#AD9EC9',
    },
    {
        title: 'Answered questions',
        value: 40,
        color: '#27A624',
    },
    {
        title: 'Marked for review',
        value: 10,
        color: '#FF8900',
    },
    {
        title: 'Answered and marked for review',
        value: 30,
        color: '#604195',
    },
];

const Banner = ({ endTime, submitted }) => {
    if (submitted || new Date(endTime) < new Date()) {
        return (
            <div className="py-6 px-8 bg-green-1 bg-opacity-10 rounded flex">
                <img src={timerGreen} alt="" className="h-14 w-14 mr-6" />
                <div>
                    <p className="text-xl text-green-1 font-semibold opacity-90">
                        {submitted ? 'Yay!' : 'Time’s up!'}
                    </p>
                    <p className="text-green-1 mt-1">
                        Your quiz have been
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

const SubmitQuiz = () => (
    <div className="py-6 px-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-semibold">Submit Quiz</h1>
            <CrossIcon />
        </div>
        <Banner endTime="January 22, 2022 21:00:00" submitted={false} />
        <div className="flex mt-6 items-center">
            <div className="w-6/12">
                <div className="w-52 mx-auto">
                    <PieChart
                      data={dummyData}
                      radius={PieChart.defaultProps.radius - 2}
                      segmentsShift={1}
                    />
                </div>
            </div>
            <div className="flex-grow">
                <p className="text-lg mb-6">
                    Total number of questions:
                    {' '}
                    <span className="font-semibold">100</span>
                </p>
                <div>
                    {dummyData.map(({ title, value, color }) => (
                        <div key={title} className="flex my-3">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <SecondaryCTA text="Cancel" />
            </div>
            <div className="w-24 ml-4">
                <PrimaryCTA text="Submit" />
            </div>
        </div>
    </div>
);

Banner.propTypes = {
    endTime: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
};

export default SubmitQuiz;
