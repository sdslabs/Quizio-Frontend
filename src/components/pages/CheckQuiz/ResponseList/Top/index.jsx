import React, { useEffect, useState } from 'react';
import '@pagestyles/check_quiz/top.scss';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useGetRegistrants } from '@api/register/useRegister';
import { useParams } from 'react-router-dom';
import log from '@utils/log';
import dayjs from 'dayjs';
import { useGetUserPublicProfile } from '@api/users/useUsers';

const Top = () => {
  const { quizID } = useParams();
  const [quizName, setQuizName] = useState('');
  const [creator, setCreator] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  const [totalParticipants, setTotalParticipants] = useState(1);
  const {
    data: quizData,
    isLoading: isQuizLoading,
    isSuccess: isQuizSuccess,
  } = useGetQuiz(quizID, '');
  const {
    data: registrantsData,
    isLoading: isRegistrantsLoading,
    isSuccess: isRegistrantsSuccess,
  } = useGetRegistrants(quizID);

  const { data: creatorPublicProfileData } = useGetUserPublicProfile(creator);

  useEffect(() => {
    if (isQuizSuccess) {
      log('Got Quiz Data: ', { quizData });
      setQuizName(quizData?.quiz?.name || 'Quiz Name not set');
      setCreator(quizData?.quiz?.creator || 'Quiz Creator not found');
      const date = dayjs(quizData?.quiz?.startTime);
      setCreatedOn(date.toString());
    }
  }, [isQuizSuccess]);

  useEffect(() => {
    if (isRegistrantsSuccess) {
      setTotalParticipants(registrantsData.data.data.users.length);
    }
  }, [isRegistrantsSuccess]);

  useEffect(() => {
    if (creatorPublicProfileData && creatorPublicProfileData.success) {
      setCreatorName(
        `${creatorPublicProfileData?.data?.firstName} ${creatorPublicProfileData?.data?.lastName}`,
      );
    }
  }, [creatorPublicProfileData]);

  useEffect(() => {
    log('CheckQuiz/ResponseList/Top:', { quizID });
  }, [quizID]);

  if (isQuizLoading) return <div>Loading Quiz...</div>;
  if (isRegistrantsLoading) return <div>Loading Registrants...</div>;

  return (
      <div className="dashboard-top">
          <div className="quiz-details-container">
              <div className="quiz-details-title">{quizName}</div>
              <div className="quiz-details-content">
                  Scheduled on
                  {' '}
                  {createdOn}
              </div>
              <div className="quiz-details-content">
                  Created by:
                  {' '}
                  <span className="content-link">{creatorName}</span>
              </div>
              <div className="quiz-details-content">
                  Result published by:
                  {' '}
                  <span className="content-link">Angad Kambli</span>
                  , 10th February,
                  2022, XX:XX PM
              </div>
          </div>
          <div className="participants-container">
              <div className="participants-count">{totalParticipants}</div>
              <div className="participants-text">Total</div>
              <div className="participants-text"> Participants</div>
          </div>
          <div className="checks-container">
              <div className="checks-count">6969</div>
              <div className="checks-text">Checks</div>
              <div className="checks-text">Completed</div>
          </div>
      </div>
  );
};

export default Top;
