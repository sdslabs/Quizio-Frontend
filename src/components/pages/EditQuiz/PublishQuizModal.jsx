import React from 'react';
import PropTypes from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import '@pagestyles/register/start_quiz_modal.scss';
import { publishQuiz } from '@api/quizzes/publishQuiz';

const PublishQuizModal = ({ quizID, setShowModal }) => {
    const handlePublishQuiz = () => {
        publishQuiz({ quizID });
        // handle publishQuiz in case of successful publication or in case of error
    };
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
