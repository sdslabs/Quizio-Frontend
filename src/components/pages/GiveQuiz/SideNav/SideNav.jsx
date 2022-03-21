import React, { Fragment, useState } from 'react';
import '@styles/pages/give_quiz/sidenav.scss';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useParams, useHistory } from 'react-router-dom';
import SubmitQuiz from '@components/Modals/SubmitQuiz';
import ModalWrapper from '@components/Modals/ModalWrapper';
import AllSections from './AllSections';

const SideNav = () => {
  const history = useHistory();
  const { sectionID } = useParams();
  // Local States
  const [showModal, setshowModal] = useState(false);
  const { quiz } = useGiveQuizStore();

  const handleInstructions = () => history.push(`/quiz/attempt/${quiz.quizioID}`);

  return (
      <>
          <div className="w-72 bg-grey-2 h-screen border-r border-grey-N4 flex-shrink-0 overflow-auto fixed pb-36">
              <p className="primary-text py-8 px-10 w-full">{quiz.name}</p>
              <button
                type="button"
                className={`w-full m-0 text-left side-nav-item${!sectionID ? '-active' : ''}`}
                onClick={handleInstructions}
              >
                  Instructions
              </button>
              <AllSections />
              <div className="fixed bottom-0 px-10 pt-1 pb-6 w-72 z-10 bg-white border-r border-grey-N4">
                  <SecondaryCTA
                    text="Submit Quiz"
                    onClick={() => {
              setshowModal(true);
            }}
                  />
              </div>
          </div>
          <ModalWrapper showModal={showModal} setShowModal={setshowModal}>
              <SubmitQuiz setShowModal={setshowModal} />
          </ModalWrapper>
      </>
  );
};

export default SideNav;
