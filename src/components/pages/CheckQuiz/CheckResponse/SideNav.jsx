import React, { useEffect } from 'react';
import '@styles/pages/give_quiz/sidenav.scss';
import DropDownIcon from '@icons/dropdownArrowDown.svg';
import QuestionBubble from '@components/Visual/QuestionBubble';
import { useParams, useHistory } from 'react-router-dom';
import { useGetMultipleSections } from '@api/quizzes/useSections';
import { ReactComponent as ScrollIcon } from '@icons/scrollIcon.svg';
import useCheckQuizStore from '@redux/store/zustand/checkQuiz';
import log from '@utils/log';
import { useSelector } from 'react-redux';

const SideNav = () => {
  const { quiz } = useCheckQuizStore();
  const self = useSelector((state) => state.auth.user);

  return (
      <div className="w-80 bg-grey-2 h-screen border-r border-grey-N4 flex-shrink-0 overflow-auto fixed pb-36">
          <p className="primary-text pt-8 px-10">{quiz.name}</p>
          <div className="flex flex-row pt-8 pb-4 ">
              <p className="text-purple-V6 font-semibold text-xl pl-10 pr-2">
                  {`${self.firstName} ${self.lastName}`}
              </p>
              <ScrollIcon />
          </div>
          {/* <div className="bg-purple-V1 mx-6">
                <div className="flex flex-row py-2 justify-between">
                    <p className="text-black text-xs px-2">
                        Total Ques :
                        {' '}
                        <span className="text-purple-V6">100</span>
                    </p>
                    <p className="text-black text-xs px-2">
                        Autochecked :
                        {' '}
                        <span className="text-purple-V6">40</span>
                    </p>
                </div>
                <div className="flex flex-row py-2 justify-between">
                    <p className="text-black text-xs px-2">
                        Manually checked :
                        {' '}
                        <span className="text-purple-V6">100</span>
                    </p>
                    <p className="text-black text-xs px-2">
                        Unchecked :
                        {' '}
                        <span className="text-purple-V6">40</span>
                    </p>
                </div>
            </div> */}
          <div className="mx-6 pt-4 pb-8 flex-row items-center justify-begin hidden">
              <input
                type="checkbox"
                className="border-purple-V6 rounded"
                defaultChecked={false}
                onChange={() => {}}
              />
              <span className="text-black text-xs px-2">
                  Show only unchecked questions
              </span>
          </div>
          <AllSections />
      </div>
  );
};

const mapSectionsData = (result) => result.map((data) => data?.data?.data?.data?.section);

const AllSections = () => {
  const {
    quiz,
    sections,
    setSections,
    setCurrentQuestion,
    setCurrentSection,
    setCurrentQuestionIndex,
  } = useCheckQuizStore();

  const { registrantID } = useParams();

  const result = useGetMultipleSections(quiz?.sections || []);

  const isSuccess = result.every((data) => !data.isLoading);

  const { sectionID } = useParams();

  const history = useHistory();

  const handleSectionTabClick = (id) => {
    history.push(`/quiz/check/${quiz.quizioID}/${registrantID}/${id}/`);
  };

  const handleBubbleClick = (questionID, title, questionIndex) => {
    setCurrentQuestion(questionID);
    setCurrentSection(title);
    setCurrentQuestionIndex(questionIndex);
  };

  useEffect(() => {
    if (isSuccess) {
      log('mapping');
      setSections(mapSectionsData(result) || []);
    }
  }, [isSuccess]);
  useEffect(() => {
    log({ sections });
  }, [sections]);
  return (
      <>
          {sections.map(({ title, questions, quizioID }) => (
              <div key={quizioID}>
                  <button
                    type="button"
                    className={`side-nav-item${
              sectionID === quizioID ? '-active' : ''
            } flex justify-between`}
                    onClick={() => handleSectionTabClick(quizioID)}
                  >
                      {title}
                      <img src={DropDownIcon} alt="" className="side-nav-toggle" />
                  </button>
                  <div
                    className={`side-nav-questions${
              sectionID === quizioID ? '-active' : ''
            }`}
                  >
                      {questions.map((question, quesIDx) => (
                          <button
                            onClick={() => {
                  handleBubbleClick(question, title, quesIDx + 1);
                }}
                            key={question || quesIDx}
                            type="button"
                          >
                              <QuestionBubble number={quesIDx + 1} type="not-visited" />
                          </button>
            ))}
                  </div>
              </div>
      ))}
      </>
  );
};

export default SideNav;
