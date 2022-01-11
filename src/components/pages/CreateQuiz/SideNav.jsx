import React from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as QuizDetailsIcon } from '@icons/CreateQuiz/quiz-details.svg';
import { ReactComponent as RegistrationFormSelectedIcon } from '@icons/CreateQuiz/registration-form-selected.svg';
import { ReactComponent as RegistrantsIcon } from '@icons/CreateQuiz/registrants.svg';
import SideNavOption from './SideNavOption';
import SideNavQuestions from './SideNavQuestions';
import '@pagestyles/create_quiz/sidenav.scss';

const SideNav = () => {
  const selected = useSelector((state) => state.quiz.createQuizStage);

  return (
      <div className="create-quiz-sidenav">
          <div className="create-quiz-sidenav-title">Quiz Name</div>
          <SideNavOption
            text="Quiz Details"
            SelectedIcon={QuizDetailsIcon}
            Icon={QuizDetailsIcon}
            selected={selected}
          />
          <SideNavOption
            text="Registration form"
            SelectedIcon={RegistrationFormSelectedIcon}
            Icon={RegistrationFormSelectedIcon}
            selected={selected}
          />
          <SideNavQuestions selected={selected} />
          <SideNavOption
            text="Registrations"
            SelectedIcon={RegistrantsIcon}
            Icon={RegistrantsIcon}
            selected={selected}
          />
      </div>
  );
};
export default SideNav;
