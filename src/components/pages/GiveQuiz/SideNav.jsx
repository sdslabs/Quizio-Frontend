/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-nested-ternary */
import React, { Fragment, useEffect, useState } from 'react';
import '@styles/pages/give_quiz/sidenav.scss';
import DropDownIcon from '@icons/dropdownArrowDown.svg';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import QuestionBubble from '@components/Visual/QuestionBubble';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useParams, useHistory } from 'react-router-dom';
import { useGetMultipleSections } from '@api/quizzes/useSections';
import SubmitQuiz from '@components/Modals/SubmitQuiz';
import ModalWrapper from '@components/Modals/ModalWrapper';

const SideNav = () => {
  const { quiz } = useGiveQuizStore();
  const [showModal, setshowModal] = useState(false);
  console.log(quiz, 'name');
  const history = useHistory();
  const { sectionID } = useParams();

  return (
      <>
          <div className="w-72 bg-grey-2 h-screen border-r border-grey-N4 flex-shrink-0 overflow-auto fixed pb-36">
              <p className="primary-text py-8 px-10">{quiz.name}</p>
              <p
                className={`side-nav-item${!sectionID ? '-active' : ''}`}
                onClick={() => history.push(`/quiz/attempt/${quiz.quizioID}`)}
              >
                  Instructions
              </p>
              <AllSections />
              <div className="fixed bottom-0 px-10 pt-1 pb-6 w-72 z-10 bg-white border-r border-grey-N4">
                  <SecondaryCTA text="Submit Quiz" onClick={() => { setshowModal(true); }} />
              </div>

          </div>
          <ModalWrapper showModal={showModal} setShowModal={setshowModal}><SubmitQuiz setShowModal={setshowModal} /></ModalWrapper>
      </>

  );
};

const mapSectionsData = (result) => result.map((data) => data?.data?.data?.data?.section);

const AllSections = () => {
    const {
        quiz, sections, setSections, currentQuestion, answeredQuestions, markedAnsweredQuestions, markedQuestions,
        setCurrentQuestion, setCurrentSection, setCurrentQuestionIndex,
        setTotalQuestions,
       } = useGiveQuizStore();

  const result = useGetMultipleSections(quiz?.sections || []);

  const isSuccess = result.every((data) => !data.isLoading);

  const { sectionID } = useParams();

  const history = useHistory();

    const handleSectionTabClick = (id) => {
        setCurrentQuestion(null);
        history.push(`/quiz/attempt/${quiz.quizioID}/${id}`);
    };
    const handleBubbleClick = (questionID, title, questionIndex) => {
        setCurrentQuestion(questionID);
        setCurrentSection(title);
        setCurrentQuestionIndex(questionIndex);
    };

  useEffect(() => {
    if (isSuccess) {
      setSections(mapSectionsData(result) || []);
      const sectionsData = mapSectionsData(result);
    console.log(sectionsData);
    let totalQuestions = 0;
     sectionsData.forEach((section) => {
       totalQuestions += section?.questions?.length || 0;
    });
    setTotalQuestions(totalQuestions);
    }
  }, [isSuccess]);

    return (
        <>
            {sections.map(({ title, questions, quizioID }) => (
                <Fragment key={quizioID}>
                    <p
                      className={`side-nav-item${sectionID === quizioID ? '-active' : ''} flex justify-between`}
                      onClick={() => handleSectionTabClick(quizioID)}
                    >
                        {title}
                        <img src={DropDownIcon} alt="" className="side-nav-toggle" />
                    </p>
                    <div className={`side-nav-questions${sectionID === quizioID ? '-active' : ''}`}>
                        {
                        questions.map((question, quesIDx) => (
                            <button onClick={() => { handleBubbleClick(question, title, quesIDx + 1); }} key={question || quesIDx} type="button">
                                <QuestionBubble
                                  number={quesIDx + 1}
                                  type={currentQuestion === question ? 'active'
                                : (answeredQuestions.includes(question) ? 'answered'
                                : (markedQuestions.includes(question) ? 'marked'
                                : (markedAnsweredQuestions.includes(question) ? 'marked-answered'
                                : 'not-visited')))}
                                />
                            </button>
                        ))
}
                    </div>
                </Fragment>
            ))}
        </>
  );
};

export default SideNav;
