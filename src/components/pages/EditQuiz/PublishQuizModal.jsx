import React from 'react';
import PropTypes from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import '@pagestyles/register/start_quiz_modal.scss';
import { publishQuiz } from '@api/quizzes/publishQuiz';
import log from '@utils/log';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePublishQuiz } from '@api/quizzes/useQuizzes';

const PublishQuizModal = ({ quizID, setShowModal }) => {
    const history = useHistory();

    const handlePublishQuiz = () => {
      mutate({quizID :quizID});           
    };

    const {
      mutate, isSuccess, isError
     } = usePublishQuiz();

    useEffect(() => {
      if(isSuccess){
        
        toast.success('Quiz Published Successfully!', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push(`/`);
      }
      if(isError){
        setShowModal(false);
        toast.error('Quiz Publish Failed!', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      log({"success":isSuccess, 
        "error":isError})
    }, [isSuccess, isError]);

    return (
        <div className="start-quiz">
            <div className="start-quiz-title">
                Publish Quiz
                <button
                  type="button"
                  onClick={() => {
          setShowModal(false);
        }}
                >
                    <CrossIcon className="m-1" />
                </button>
            </div>
            <div className="start-quiz-container">
                <div className="start-quiz-container-text">
                    Are you sure you want to publish this quiz ?
                </div>
            </div>
            <div className="start-quiz-submit-container">
                <div className="start-quiz-button">
                    <PrimaryCTA
                      text="Publish Quiz"
                      onClick={handlePublishQuiz}
                    />
                </div>
            </div>
        </div>
      );
    };

PublishQuizModal.propTypes = {
  quizID: PropTypes.string.isRequired,
  setShowModal: PropTypes.func,
};

PublishQuizModal.defaultProps = {
  setShowModal: () => {},
};
export default PublishQuizModal;
