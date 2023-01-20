import React, { useEffect } from 'react';
import { ReactComponent as QuestionsIcon } from '@icons/CreateQuiz/SideNavIcons/questions.svg';
import { ReactComponent as QuestionsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/questionsSelected.svg';
import { ReactComponent as DropdownArrowDownIcon } from '@icons/dropdownArrowDown.svg';
import useCreateQuizStore from '@store/zustand/createQuiz';
import { useAddSection } from '@api/quizzes/useSections'
import Section from './Section'
import AddSection from './AddSection'
import shallow from 'zustand/shallow'

const TAB_NAME = 'Questions'

const getCreateQuizStoreData = (state) => ({
  currentStage: state.currentStage,
  setCurrentStage: state.setCurrentStage,
  sections: state.sections,
  addSection: state.addSection,
  quizData: state.currentQuizData,
})

const SideNavQuestions = () => {
  // Create Quiz Store
  const { currentStage, setCurrentStage, sections, addSection, quizData } = useCreateQuizStore(
    getCreateQuizStoreData,
    shallow,
  )

  const isQuizLoaded = Boolean(quizData)

  // Section Data updaters
  const {
    data: addSectionRes,
    isLoading: isAddSectionLoading,
    isSuccess: addSectionSuccess,
    mutate: mutateSection,
  } = useAddSection()

  // Check if this tab is active
  const isActive = currentStage === TAB_NAME
  // Sets current tab active
  const setActiveNav = () => setCurrentStage(TAB_NAME)

  useEffect(() => {
    // Load original sections from db and save to store
    if (isQuizLoaded) {
      const originalSectionIDs = quizData?.quiz?.sections
      originalSectionIDs.map((originalSectionID) => addSection(originalSectionID))
    }
  }, [isQuizLoaded])

  useEffect(() => {
    if (addSectionSuccess) {
      const response = addSectionRes.data?.data?.section
      if (response) addSection(response.quizioID)
    }
  }, [addSectionSuccess, addSectionRes])

  if (isAddSectionLoading) return <div>Adding section...</div>
  if (!isQuizLoaded) return <div>Quiz loading...</div>

  return (
    <div className='flex flex-col'>
      <button
        type='button'
        onClick={setActiveNav}
        className={`w-full create-quiz-sidenav-option${isActive ? '-selected' : ''}`}
      >
        <div className='create-quiz-sidenav-option-icon'>
          {isActive ? <QuestionsSelectedIcon /> : <QuestionsIcon />}
        </div>
        <div className={`create-quiz-sidenav-option-text${isActive ? '-selected' : ''}`}>
          {TAB_NAME}
        </div>
        <div className='dropdown'>
          <DropdownArrowDownIcon />
        </div>
      </button>
      {isActive && (
        <div>
          {sections.map((s, index) => (
            <Section key={s.id} index={index} section={s} />
          ))}
          <AddSection mutate={mutateSection} />
        </div>
      )}
    </div>
  )
}

export default SideNavQuestions;
