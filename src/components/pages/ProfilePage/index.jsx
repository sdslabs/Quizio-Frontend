import React from 'react';
import gmail from '@icons/gmail.svg';
import phone from '@icons/phone.svg';
import facebook from '@icons/facebook.svg';
import instagram from '@icons/instagram.svg';
import linkedin from '@icons/linkedin.svg';

// const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
// const [hostedQuizzes, setHostedQuizzes] = useState([]);

const ProfilePage = () => (
    <div>
        <div className="absolute w-full h-14 shadow-sm py-3 px-40">
            <div className="text-xl font-bold text-purple-V6">Quizio</div>
        </div>
        <div className="mx-40 pt-32">
            <div className="flex flex-row justify-evenly">
                <ProfileCard />
                <div className="h-52 w-40 rounded bg-purple-V1 flex flex-col justify-center items-center">
                    <div className="text-6xl font-semibold text-purple-V6 pb-4">5</div>
                    <div className="text-xl text-center text-purple-V6">Attempted</div>
                    <div className="text-xl text-center text-purple-V6">Quizzes</div>
                </div>
                <div className="h-52 w-40 rounded bg-purple-V1 flex flex-col justify-center items-center">
                    <div className="text-6xl font-semibold text-purple-V6 pb-4">10</div>
                    <div className="text-xl text-center text-purple-V6">Hosted</div>
                    <div className="text-xl text-center text-purple-V6">Quizzes</div>
                </div>
            </div>

            <div className="pt-12 pb-9 text-purple-V6 font-semibold text-xl">Attempted Quizzes</div>

            <div className="flex flex-col">
                <QuizCard />
                <QuizCard />
                <QuizCard />
                <QuizCard />
            </div>
        </div>
    </div>
);
const QuizCard = () => (
    <div className="relative w-full h-36 my-2 rounded border border-solid border-purple-V6 border-opacity-60">
        <div className="flex flex-row">
            <div className="p-4">
                <img src="./blackbird.jpg" className="h-28 w-28 object-cover rounded" alt="QuizImage" />
            </div>
            <div className="flex flex-grow flex-col p-4">
                <div className="align-middle pb-2">
                    <div className="float-left text-sm font-semibold">Quiz Title </div>
                    <div className="float-left text-xs text-black-1"> | Created By: </div>
                    <div className="float-left text-xs text-purple-V6"> Name</div>
                </div>

                <div className="text-grey-N6 text-ellipsis">Description</div>
                <div className="pb-1">
                    <div className="float-left text-grey-N6">Scheduled: </div>
                    <div className="float-left text-black-1">Date</div>
                </div>
                <div>
                    <a href="www.google.com">
                        <button type="button" className="bg-purple-V6 text-white px-4 py-2 rounded">
                            View Report
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

const ProfileCard = () => (
    <div className="relative h-52 w-8/12 shadow-lg rounded">
        <div className="flex flex-row">
            <div className="flex flex-col w-40 py-4 px-2">
                <img src="./blackbird.jpg" className="h-36 w-36 rounded-full object-cover" alt="Profile" />
                <div className="text-center text-purple-V6 py-1">
                    <a href="https://github.com/">Edit Details</a>
                </div>
            </div>

            <div className="flex flex-grow flex-col p-4">
                <div className="text-2xl text-purple-V6 font-bold pt-3">Somesh Solanki</div>
                <div className="text-black-1">Indian Institute of Technology</div>
                <div className="text-purple-V6">Bangalore</div>
                <div className="pt-4 gap-x-2 flex flex-row">
                    <img src={gmail} className="h-4 w-5" alt="Gmail" />
                    <div className="text-sm text-black-1">john.doe@gmail.com</div>
                </div>
                <div className="pt-1 flex gap-x-2 flex-row">
                    <img src={phone} className="h-4 w-5" alt="Phone" />
                    <div className="text-sm text-black-1">9980929292</div>
                </div>
            </div>
            <div className="flex flex-col gap-y-6 px-8 mt-12">
                <img src={facebook} className="h-6 w-6" alt="Facebook" />
                <img src={instagram} className="h-6 w-6" alt="Instagram" />
                <img src={linkedin} className="h-6 w-6" alt="Linkedin" />
            </div>
        </div>
    </div>
);

export default ProfilePage;
