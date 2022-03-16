import React from 'react';
import PropTypes from 'prop-types';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import log from '@utils/log';

const AddSection = ({ mutate }) => {
  const { currentID: quizID } = useCreateQuizStore();

  const handleAddNewSection = () => {
    log('Add new section!', { quizID });
    mutate({ quizID });
  };

  return (
      <div className="p-4">
          <button
            type="button"
            className="side-nav-item-active w-full "
            onClick={handleAddNewSection}
          >
              + Add Section
          </button>
      </div>
  );
};

AddSection.propTypes = {
  mutate: PropTypes.func.isRequired,
};

export default AddSection;
