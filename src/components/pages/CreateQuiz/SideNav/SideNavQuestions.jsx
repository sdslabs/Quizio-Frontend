import React, { useEffect } from 'react';
import { ReactComponent as QuestionsIcon } from '@icons/CreateQuiz/SideNavIcons/questions.svg';
import { ReactComponent as QuestionsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/questionsSelected.svg';
import { ReactComponent as DropdownArrowDownIcon } from '@icons/dropdownArrowDown.svg';

import useCreateQuizStore from '@store/zustand/createQuiz';
import { useAddSection } from '@api/quizzes/useSections';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import Questions from './Questions';

const TAB_NAME = 'Questions';

const SideNavQuestions = () => {
  const {
  currentStage, setCurrentStage, activeSectionIndex, setActiveSection, sections, addSection,
  } = useCreateQuizStore();

  const isActive = currentStage === TAB_NAME;
  const setActiveNav = () => setCurrentStage(TAB_NAME);

  const quizID = new URLSearchParams(window.location.search).get('quizID');

  const {
  data, isLoading: isAddSectionLoading, isSuccess: addSectionSuccess, mutate: mutateSection,
  } = useAddSection();

  const { data: quizData, isLoading: isQuizLoading, isSuccess: isQuizSuccess } = useGetQuiz(quizID);

  const handleAddNewSection = () => {
    mutateSection({ quizId: quizID });
  };

  useEffect(() => {
    if (isQuizSuccess) {
      const prevSections = quizData.data?.data?.quiz?.sections;
      if (prevSections) prevSections.forEach((s) => addSection(s));
    }
  }, [isQuizSuccess]);

  useEffect(() => {
    if (addSectionSuccess) {
      const response = data.data?.data?.section;
      if (response) addSection(response.quizioID);
    }
  }, [addSectionSuccess, data]);

  if (isAddSectionLoading || isQuizLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="flex flex-col">

          <button
            type="button"
            onClick={setActiveNav}
            className={`create-quiz-sidenav-option${isActive ? '-selected' : ''}`}
          >
              <div className="create-quiz-sidenav-option-icon">
                  {isActive ? <QuestionsSelectedIcon /> : <QuestionsIcon />}
              </div>
              <div className={`create-quiz-sidenav-option-text${isActive ? '-selected' : ''}`}>
                  {TAB_NAME}
              </div>
              <div className="dropdown">
                  <DropdownArrowDownIcon />
              </div>
          </button>
          {isActive && (
          <div>
              {sections.map(({ title, questions }, index) => (
                  <React.Fragment key={title}>
                      <p
                        className={`side-nav-item${activeSectionIndex === index ? '-active' : ''} flex justify-between`}
                        onClick={() => setActiveSection(index)}
                      >
                          {title}
                          <DropdownArrowDownIcon />
                      </p>
                      <div>
                          <Questions questions={questions} isActive={activeSectionIndex === index} />
                      </div>

                  </React.Fragment>
          ))}
              <div className="p-4">
                  <button
                    type="button"
                    className="side-nav-item-active w-full "
                    onClick={handleAddNewSection}
                  >
                      + Add Section
                  </button>
              </div>
          </div>
      )}
      </div>

  );
};

export default SideNavQuestions;
