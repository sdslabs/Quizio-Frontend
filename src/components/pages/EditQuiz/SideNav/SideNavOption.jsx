/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import useCreateQuizStore from '@store/zustand/createQuiz';

const SideNavOption = ({ SelectedIcon, Icon, text }) => {
  const { currentStage, setCurrentStage } = useCreateQuizStore();

  const handleChangeSet = () => setCurrentStage(text);
  const isActive = currentStage === text;

  return (
      <button
        type="button"
        onClick={handleChangeSet}
        className={`create-quiz-sidenav-option${isActive ? '-selected' : ''}`}
      >
          <div className="create-quiz-sidenav-option-icon">
              {isActive ? <SelectedIcon /> : <Icon />}
          </div>
          <div
            className={`create-quiz-sidenav-option-text${
          isActive ? '-selected' : ''
        }`}
          >
              {text}
          </div>
      </button>
  );
};

SideNavOption.propTypes = {
  SelectedIcon: PropTypes.any.isRequired,
  Icon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
};

export default SideNavOption;
