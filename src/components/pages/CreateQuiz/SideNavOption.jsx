/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCreateQuizStage } from '@redux/actions/quiz';

const SideNavOption = ({
 SelectedIcon, Icon, text, selected,
}) => {
  const dispatch = useDispatch();

  return (
      <button
        type="button"
        onClick={() => {
        dispatch(setCreateQuizStage(text));
      }}
        className={
        selected === text
          ? 'create-quiz-sidenav-option-selected'
          : 'create-quiz-sidenav-option'
      }
      >
          <div className="create-quiz-sidenav-option-icon">
              {selected === text ? <SelectedIcon /> : <Icon />}
          </div>
          <div
            className={
          selected === text
            ? 'create-quiz-sidenav-option-text-selected'
            : 'create-quiz-sidenav-option-text'
        }
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
  selected: PropTypes.bool.isRequired,
};

export default SideNavOption;
