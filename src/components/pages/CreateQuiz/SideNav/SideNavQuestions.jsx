import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as QuestionsIcon } from '@icons/CreateQuiz/SideNavIcons/questions.svg';
// import { ReactComponent as QuestionsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/questionsSelected.svg';
import { ReactComponent as DropdownArrowDownIcon } from '@icons/dropdownArrowDown.svg';
import { ReactComponent as DropdownArrowUpIcon } from '@icons/dropdownArrowUp.svg';
import { setCreateQuizStage } from '@redux/actions/quiz';

const SideNavQuestions = ({ selected }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(selected === 'Questions');
  }, [selected]);

  return (
      <button
        type="button"
        onClick={() => {
        dispatch(setCreateQuizStage('Questions'));
      }}
        className="create-quiz-sidenav-question"
      >
          <div className="icon">
              <QuestionsIcon />
          </div>
          <div className="text">Questions</div>
          <div className="dropdown">
              {active ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
          </div>
      </button>
  );
};
SideNavQuestions.propTypes = {
  selected: PropTypes.string.isRequired,
};

export default SideNavQuestions;
