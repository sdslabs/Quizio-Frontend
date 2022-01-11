import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as QuestionsIcon } from '@icons/CreateQuiz/questions.svg';

const SideNavQuestions = ({ selected, setSelected }) => (
    <button
      type="button"
      onClick={() => {
      setSelected('Questions');
    }}
      className={
      selected === 'Questions'
        ? 'create-quiz-sidenav-option-selected'
        : 'create-quiz-sidenav-option'
    }
    >
        <div className="create-quiz-sidenav-option-icon">
            {selected === 'Questions' ? <QuestionsIcon /> : <QuestionsIcon />}
        </div>
        <div
          className={
        selected === 'Questions'
          ? 'create-quiz-sidenav-option-text-selected'
          : 'create-quiz-sidenav-option-text'
      }
        >
            Questions
        </div>
    </button>
);

SideNavQuestions.propTypes = {
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default SideNavQuestions;
