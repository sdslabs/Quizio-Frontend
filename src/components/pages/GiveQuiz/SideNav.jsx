import React, { useEffect } from 'react';
import DropDownIcon from '@icons/dropdownArrowDown.svg';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import QuestionBubble from '@components/Visual/QuestionBubble';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useParams, useHistory } from 'react-router-dom';
import { useGetMultipleSections } from '@api/quizzes/useSections';

const SideNav = () => {
  const { quiz } = useGiveQuizStore();

  const history = useHistory();
  const { sectionID } = useParams();

  return (
      <div className="w-72 bg-grey-2 h-screen border-r border-grey-N4 flex-shrink-0 overflow-auto fixed pb-36">
          <p className="primary-text py-8 px-10">{quiz.name}</p>
          <p
            className={`side-nav-item${!sectionID ? '-active' : ''}`}
            onClick={() => history.push(`/quiz/${quiz.quizioID}`)}
          >
              Instructions
          </p>
          <AllSections />
          <div className="fixed bottom-0 px-10 pt-1 pb-6 w-72 z-10 bg-white border-r border-grey-N4">
              <SecondaryCTA text="Submit Quiz" />
          </div>
      </div>
  );
};

const mapSectionsData = (result) => result.map((data) => data?.data?.data?.data?.section);

const AllSections = () => {
  const { quiz, sections, setSections } = useGiveQuizStore();

  const result = useGetMultipleSections(quiz?.sections || []);

  const isSuccess = result.every((data) => !data.isLoading);

  const { sectionID } = useParams();

  const history = useHistory();

  const handleSectionTabClick = (id) => {
    history.push(`/quiz/${quiz.quizioID}/${id}`);
  };

  useEffect(() => {
    if (isSuccess) {
      setSections(mapSectionsData(result) || []);
    }
  }, [isSuccess]);

  return (
      <>
          {sections.map(({ title, questions, quizioID }) => (
              <>
                  <p
                    className={`side-nav-item${
              sectionID === quizioID ? '-active' : ''
            } flex justify-between`}
                    onClick={() => handleSectionTabClick(quizioID)}
                  >
                      {title}
                      <img src={DropDownIcon} alt="" className="side-nav-toggle" />
                  </p>
                  <div
                    className={`side-nav-questions${
              sectionID === quizioID ? '-active' : ''
            }`}
                  >
                      {questions.map((question, index) => (
                          <QuestionBubble
                            number={index + 1}
                            key={question}
                            type="not-visited"
                          />
            ))}
                  </div>
              </>
      ))}
      </>
  );
};

export default SideNav;
