/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCreateQuizStage } from '@redux/actions/quiz';

const SideNavOption = ({
// SelectedIcon,
  Icon, text, selected,
}) => {
  const dispatch = useDispatch();

  return (
      <div className="flex flex-col pl-2 pr-2">
          <button
            type="button"
            onClick={() => {
        dispatch(setCreateQuizStage(text));
      }}
            className={
        selected === text
          ? 'create-quiz-sidenav-option-selected p-2'
          : 'create-quiz-sidenav-option p-2'
      }
          >
              <div className="create-quiz-sidenav-option-icon">
                  {selected === text ? <Icon /> : <Icon />}
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
      </div>
  );
};
SideNavOption.propTypes = {
 // SelectedIcon: PropTypes.any.isRequired,
  Icon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
};

export default SideNavOption;
