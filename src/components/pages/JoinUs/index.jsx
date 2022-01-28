import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import JoinUsImg from '@images/JoinUsImg.svg';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import '@pagestyles/join_us/join_us.scss';
import ModalWrapper from '@components/Modals/ModalWrapper';
import OAuthModal from '@components/Modals/OAuthModal';

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
            maxWidth="md"
          >
              <OAuthModal />
          </ModalWrapper>
      </div>
  );
};

export default JoinUs;
