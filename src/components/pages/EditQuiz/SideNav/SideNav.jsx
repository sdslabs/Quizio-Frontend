import React from 'react';
import { ReactComponent as QuizDetailsIcon } from '@icons/CreateQuiz/SideNavIcons/quizDetails.svg';
import { ReactComponent as QuizDetailsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/quizDetailsSelected.svg';
import { ReactComponent as RegistrationFormSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/registrationFormSelected.svg';
import { ReactComponent as RegistrationFormIcon } from '@icons/CreateQuiz/SideNavIcons/registrationForm.svg';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import log from '@utils/log';
import SideNavOption from './SideNavOption';
import SideNavQuestions from './SideNavQuestions';
import '@pagestyles/create_quiz/sidenav.scss';

const SideNav = () => {
  const handlePublish = () => {
    log('TODO: handle publish quiz!');
  };

  return (
      <div className="create-quiz-sidenav">
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

export default SideNav;
