import React, { useState } from 'react';
import { ReactComponent as QuizDetailsIcon } from '@icons/CreateQuiz/SideNavIcons/quizDetails.svg';
import { ReactComponent as QuizDetailsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/quizDetailsSelected.svg';
import { ReactComponent as RegistrationFormSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/registrationFormSelected.svg';
import { ReactComponent as RegistrationFormIcon } from '@icons/CreateQuiz/SideNavIcons/registrationForm.svg';
import PropTypes from 'prop-types';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import SideNavOption from './SideNavOption';
import SideNavQuestions from './SideNavQuestions';
import ModalWrapper from '../../../Modals/ModalWrapper';
import PublishQuizModal from '../PublishQuizModal';
import '@pagestyles/create_quiz/sidenav.scss';

const SideNav = ({ quizID }) => {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const handlePublish = () => {
    setShowPublishModal(true);
  };

  return (
      <div className="create-quiz-sidenav">
          {showPublishModal && (
          <ModalWrapper
            showModal={showPublishModal}
            setShowModal={setShowPublishModal}
          >
              <PublishQuizModal
                quizID={quizID}
                setShowModal={setShowPublishModal}
              />
          </ModalWrapper>
      )}
          <div className="create-quiz-sidenav-top">
              <div className="create-quiz-sidenav-title">Quiz Name</div>
              <SideNavOption
                text="Quiz Details"
                SelectedIcon={QuizDetailsSelectedIcon}
                Icon={QuizDetailsIcon}
              />
              <SideNavOption
                text="Registration form"
                SelectedIcon={RegistrationFormSelectedIcon}
                Icon={RegistrationFormIcon}
              />
              <SideNavQuestions />
          </div>
          <div className="create-quiz-sidenav-bottom">
              <div className="create-quiz-sidenav-buttons">
                  <div className="create-quiz-sidenav-publish">
                      <SecondaryCTA text="Publish Quiz" onClick={handlePublish} />
                  </div>
              </div>
          </div>
      </div>
  );
};

SideNav.propTypes = {
  quizID: PropTypes.string.isRequired,
};

export default SideNav;
