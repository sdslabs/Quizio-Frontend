import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import ModalWrapper from '@components/Modals/ModalWrapper';
import OAuthModal from '@components/Modals/OAuthModal';
import JoinUsImg from '@images/JoinUsImg.svg';
import '@pagestyles/join_us/index.scss';

const JoinUs = () => {
  const [showModal, setShowModal] = useState(false);

  return (
      <div className="join-us">
          <div className="join-us-image">
              <img src={JoinUsImg} alt="Join Us" />
          </div>
          <div className="join-us-details">
              <div className="join-us-title">Quizio</div>
              <div className="join-us-description">
                  Testing platform developed by SDSLabs
              </div>
              <div className="join-us-submit">
                  <PrimaryCTA text="Join Us" onClick={() => setShowModal(true)} />
              </div>
          </div>
          <ModalWrapper
            showModal={showModal}
            setShowModal={setShowModal}
            hideOnOverlayClick
          >
              <OAuthModal setShowModal={setShowModal} />
          </ModalWrapper>
      </div>
  );
};

export default JoinUs;
