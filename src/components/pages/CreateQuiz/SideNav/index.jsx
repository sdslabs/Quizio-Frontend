import React from 'react';
import { ReactComponent as QuizDetailsIcon } from '@icons/CreateQuiz/SideNavIcons/quizDetails.svg';
import { ReactComponent as QuizDetailsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/quizDetailsSelected.svg';
import { ReactComponent as RegistrationFormSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/registrationFormSelected.svg';
import { ReactComponent as RegistrationFormIcon } from '@icons/CreateQuiz/SideNavIcons/registrationForm.svg';
import { ReactComponent as RegistrantsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/registrantsSelected.svg';
import { ReactComponent as RegistrantsIcon } from '@icons/CreateQuiz/SideNavIcons/registrants.svg';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import SideNavOption from './SideNavOption';
import SideNavQuestions from './SideNavQuestions';
import '@pagestyles/create_quiz/sidenav.scss';

const SideNav = () => {
  const handlePublish = () => {};
  const handleCheck = () => {};

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
              <SideNavOption
                text="Registrations"
                SelectedIcon={RegistrantsSelectedIcon}
                Icon={RegistrantsIcon}
              />
          </div>
          <div className="create-quiz-sidenav-bottom">
              <div className="create-quiz-sidenav-buttons">
                  <div className="create-quiz-sidenav-publish">
                      <SecondaryCTA text="Publish Quiz" onClick={handlePublish} />
                  </div>

                  <div className="create-quiz-sidenav-check">
                      <SecondaryCTA text="Check Quiz" onClick={handleCheck} />
                  </div>
              </div>
          </div>
      </div>
  );
};
export default SideNav;
