import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import QuizCard from './QuizCard';

const Profile = () => {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [hostedQuizzes, setHostedQuizzes] = useState([]);

  useEffect(() => {
    setAttemptedQuizzes([
      {
        title: 'Recruitment Test',
        creator: 'Stuti Lilani',
        imageURL: './blackbird.jpg',
        description: 'This is a quiz',
        date: '26 Jun, 2021 03:00PM',
        checked: true,
        rank: '1',
        totalAttempted: '10',
      },
      {
        title: 'Recruitment Test',
        creator: 'Stuti Lilani',
        imageURL: './blackbird.jpg',
        description: 'This is a quiz',
        date: '26 Jun, 2021 03:00PM',
        checked: false,
      },
    ]);
    setHostedQuizzes([]);
  }, []);
  return (
      <div>
          <div className="absolute w-full h-14 shadow-sm py-3 px-40">
              <div className="text-xl font-bold text-purple-V6">Quizio</div>
          </div>
          <div className="mx-40 pt-32">
              <div className="flex flex-row justify-start">
                  <ProfileCard />
                  <div className="h-52 w-40 ml-6 rounded bg-purple-V1 bg-opacity-40 flex flex-col justify-center items-center">
                      <div className="text-6xl font-semibold text-purple-V6 pb-4">{attemptedQuizzes.length}</div>
                      <div className="text-xl text-center text-purple-V6">Attempted</div>
                      <div className="text-xl text-center text-purple-V6">Quizzes</div>
                  </div>
                  <div className="h-52 w-40 ml-6 rounded bg-purple-V1 bg-opacity-40 flex flex-col justify-center items-center">
                      <div className="text-6xl font-semibold text-purple-V6 pb-4">{hostedQuizzes.length}</div>
                      <div className="text-xl text-center text-purple-V6">Hosted</div>
                      <div className="text-xl text-center text-purple-V6">Quizzes</div>
                  </div>
              </div>

              <div className="pt-12 pb-9 text-purple-V6 font-semibold text-xl">Attempted Quizzes</div>

              <div className="flex flex-col">
                  {attemptedQuizzes.map((quiz) => (
                      <QuizCard
                        title={quiz.title}
                        creator={quiz.creator}
                        imageURL="https://i1.sndcdn.com/artworks-qyrckKJE1mdut7kS-6IJvzQ-t500x500.jpg"
                        description={quiz.description}
                        date={quiz.date}
                        checked={quiz.checked}
                        rank={quiz.rank}
                        totalAttempted={quiz.totalAttempted}
                      />
          ))}
              </div>
          </div>
      </div>
  );
};

export default Profile;
