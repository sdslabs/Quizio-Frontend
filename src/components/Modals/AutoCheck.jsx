import React from 'react';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { PropTypes } from 'prop-types';
import axiosInstance from '@api/axiosInstance';

const AutoCheckModal = ({ quizID, setShowModal }) => {
  const onYes = () => {
      axiosInstance.post(`/quizzes/${quizID}/check`);
      // console.log('Placeholder', quizID);
      setShowModal(false);
};
  const onCancel = () => { setShowModal(false); };
  return (
      <div className="">
          <div className="flex justify-between p-10 pb-4 pt-8">
              <div className="text-2xl text-purple-V6 font-bold">Autocheck</div>
              <CrossIcon className="m-2" />
          </div>
          <div className="font-normal text-m pl-10 pr-10">Are you sure you want to autocheck the quiz?</div>
          <div className="flex justify-end p-10 pt-8">
              <div className="w-24">
                  <SecondaryCTA text="Cancel" onClick={onCancel} />
              </div>
              <div className="w-24 ml-4">
                  <PrimaryCTA text="Yes" onClick={onYes} />
              </div>
          </div>
      </div>
);
};

AutoCheckModal.propTypes = {
  quizID: PropTypes.string.isRequired,
  setShowModal: PropTypes.func,
};

AutoCheckModal.defaultProps = {
  setShowModal: () => {},
};

export default AutoCheckModal;
