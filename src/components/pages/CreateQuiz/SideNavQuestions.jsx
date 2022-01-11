import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as QuestionsIcon } from '@icons/CreateQuiz/questions.svg';
import { useDispatch } from 'react-redux';
import { setCreateQuizStage } from '@redux/actions/quiz';

const SideNavQuestions = ({ selected }) => {
  const dispatch = useDispatch();
  return (
      <button
        type="button"
        onClick={() => {
        dispatch(setCreateQuizStage('Questions'));
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
};
SideNavQuestions.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default SideNavQuestions;
