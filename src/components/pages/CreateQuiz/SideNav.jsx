import React, { useState } from 'react';
import { ReactComponent as QuizDetailsIcon } from '@icons/CreateQuiz/quiz-details.svg';
import { ReactComponent as RegistrationFormSelectedIcon } from '@icons/CreateQuiz/registration-form-selected.svg';
import { ReactComponent as RegistrantsIcon } from '@icons/CreateQuiz/registrants.svg';
import SideNavOption from './SideNavOption';
import SideNavQuestions from './SideNavQuestions';
import '@pagestyles/create_quiz/sidenav.scss';

const SideNav = () => {
  const [selected, setSelected] = useState('');

  return (
      <div className="create-quiz-sidenav">
          <div className="create-quiz-sidenav-title">Quiz Name</div>
          <SideNavOption
            text="Quiz Details"
            SelectedIcon={QuizDetailsIcon}
            Icon={QuizDetailsIcon}
            selected={selected}
            setSelected={setSelected}
          />
          <SideNavOption
            text="Registration form"
            SelectedIcon={RegistrationFormSelectedIcon}
            Icon={RegistrationFormSelectedIcon}
            selected={selected}
            setSelected={setSelected}
          />
          <SideNavQuestions selected={selected} setSelected={setSelected} />
          <SideNavOption
            text="Registrations"
            SelectedIcon={RegistrantsIcon}
            Icon={RegistrantsIcon}
            selected={selected}
            setSelected={setSelected}
          />
      </div>
  );
};
export default SideNav;
