import React from 'react';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import { ReactComponent as AlertIcon } from '@icons/alert.svg';
import { ReactComponent as TickIcon } from '@icons/tick.svg';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { PropTypes } from 'prop-types';
import { PieChart } from 'react-minimal-pie-chart';
import axiosInstance from '@api/axiosInstance';
import log from '@utils/log';

const TopAlert = ({ totalIncomplete }) => {
    if (totalIncomplete > 0) {
        return (
            <div className="flex m-10 mt-0 mb-0 p-8 bg-purple-V1">
                <AlertIcon className="mr-10" />
                <div className="flex flex-col">
                    <div className="text-xl text-purple-V6 font-bold">
                        You still have
                        {' '}
                        <b>{totalIncomplete}</b>
                        {' '}
                        incomplete
                        checks!
                    </div>
                    <div className="text-lg text-purple-V6">
                        Are you sure you want to publish results?
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex m-10 mt-0 mb-0 p-8 bg-green-1 bg-opacity-25">
            <TickIcon className="mr-10" />
            <div className="flex flex-col">
                <div className="text-xl text-green-1 font-bold">
                    You have checked all the submissions.
                </div>
                <div className="text-lg text-green-1">
                    Are you sure you want to publish results?
                </div>
            </div>
        </div>
    );
};
TopAlert.propTypes = {
    totalIncomplete: PropTypes.number.isRequired,
};

const PublishResultsModal = ({ quizID, setShowModal, data }) => {
    const onPublish = () => {
        axiosInstance.post(`/quizzes/${quizID}/publish`);
        log('TODO publish', { quizID });
        setShowModal(false);
    };
    const onCancel = () => {
        setShowModal(false);
    };
    let totalInProgress = 0;
    let totalComplete = 0;
    let totalUnvisited = 0;
    data.forEach((val) => {
        switch (val.progress) {
            case 0:
                totalUnvisited += 1;
                break;
            case 100:
                totalComplete += 1;
                break;
            default:
                totalInProgress += 1;
                break;
        }
    });
    const totalIncomplete = totalInProgress + totalUnvisited;
    const PieChartData = [
        {
            title: 'Not visited',
            value: totalUnvisited,
            color: '#AD9EC9',
        },
        {
            title: 'Completed',
            value: totalComplete,
            color: '#27A624',
        },
        {
            title: 'In Progress',
            value: totalInProgress,
            color: '#FF8900',
        },
    ];
    return (
        <div className="">
            <div className="flex justify-between p-10 pb-4 pt-8">
                <div className="text-2xl text-purple-V6 font-bold">
                    Publish Quiz Results
                </div>
                <CrossIcon className="m-2" />
            </div>
            <TopAlert totalIncomplete={totalIncomplete} />
            <div className="flex flex-row justify-center items-center">
                <div>
                    <PieChart
                      data={PieChartData}
                      radius={PieChart.defaultProps.radius - 8}
                      segmentsShift={0.5}
                    />
                </div>
                <div>
                    <div className="text-xl">
                        Total number of submissions :
                        {' '}
                        <b>572</b>
                    </div>

                    <div>
                        {PieChartData.map(({ title, value, color }) => (
                            <div key={title} className="flex my-3">
                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                      width="19"
                                      height="19"
                                      rx="4"
                                      fill={color}
                                    />
                                </svg>
                                <p className="text-sm ml-3">
                                    {title}
                                    :
                                    {' '}
                                    <span className="font-semibold">
                                        {value}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end p-10 pt-4">
                <div className="w-24">
                    <SecondaryCTA text="Cancel" onClick={onCancel} />
                </div>
                <div className="w-24 ml-4">
                    <PrimaryCTA text="Publish" onClick={onPublish} />
                </div>
            </div>
        </div>
    );
};

PublishResultsModal.propTypes = {
    quizID: PropTypes.string.isRequired,
    setShowModal: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default PublishResultsModal;
