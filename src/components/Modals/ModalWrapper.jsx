import React from 'react';
import { PropTypes } from 'prop-types';

const ModalWrapper = ({
 children, showModal, hideOnOverlayClick, setShowModal,
}) => {
    const handleClick = () => {
        if (hideOnOverlayClick && setShowModal) setShowModal(false);
    };

    return (
        <div
          className={`${showModal ? '' : 'hidden'} h-screen w-screen fixed top-0 
          left-0 bg-black bg-opacity-25 flex justify-center items-center`}
          onClick={handleClick}
          role="presentation"
        >
            <div
              className="modal-content rounded bg-white shadow-2xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
              role="presentation"
            >
                {children}
            </div>
        </div>
    );
};

ModalWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    showModal: PropTypes.bool.isRequired,
    hideOnOverlayClick: PropTypes.bool,
    setShowModal: PropTypes.func,
};

ModalWrapper.defaultProps = {
    hideOnOverlayClick: false,
    setShowModal: () => {},
};

export default ModalWrapper;
