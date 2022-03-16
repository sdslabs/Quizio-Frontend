import React from 'react';
import PropTypes from 'prop-types';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import '@pagestyles/register/start_quiz_modal.scss';
import log from '@utils/log';

const PublishQuizModal = ({ setShowModal }) => (
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
                  onClick={() => log('todo: Integrate publish quiz APIs')}
                />
            </div>
        </div>
    </div>
);

PublishQuizModal.propTypes = {
  setShowModal: PropTypes.func,
};

PublishQuizModal.defaultProps = {
  setShowModal: () => {},
};
export default PublishQuizModal;
