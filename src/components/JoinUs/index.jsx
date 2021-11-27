import React from 'react';
import JoinUsButton from '@components/Buttons/JoinUs';
import { useHistory } from 'react-router';
import JoinUsImg from '../../styles/images/JoinUs.png';

const JoinUs = () => {
  const history = useHistory();
  const handleJoinUs = () => {
    history.push('/login');
  };

  return (
      <div className="flex h-screen">
          <div className="w-1/2 flex flex-col pt-56 pl-10">
              <div className="font-semibold text-8xl text-yellow-1">Quizio</div>
              <div className="leading-normal font-medium text-2xl text-grey-1 pb-10 pt-8">
                  Quizzing platform developed by SDSLabs
              </div>
              <JoinUsButton onClick={handleJoinUs} />
          </div>
          <div className="w-1/2">
              <img src={JoinUsImg} alt="" />
          </div>
      </div>
  );
};

export default JoinUs;
