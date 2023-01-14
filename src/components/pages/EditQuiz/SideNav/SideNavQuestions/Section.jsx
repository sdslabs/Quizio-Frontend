import React, { useEffect } from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import useCreateQuizStore from '@store/zustand/createQuiz'
import { useGetSectionDetails } from '@api/quizzes/useSections'
import { ReactComponent as DropdownArrowDownIcon } from '@icons/dropdownArrowDown.svg'
import QuestionBubbles from './QuestionBubbles'

const Section = ({ index, section }) => {
  const { activeSectionIndex, updateSection, setActiveSection, toggleQuestionForm } =
    useCreateQuizStore()
  const isActive = activeSectionIndex === index

  const { isLoading, isSuccess, data } = useGetSectionDetails(section?.id)

  useEffect(() => {
    if (isSuccess) {
      const sectionData = data?.data?.data?.section
      if (sectionData) {
        updateSection(
          _.omit(sectionData, ['quizioID', 'quizID', 'createdOn', 'creator']),
          section.id,
        )
      }
    }
  }, [isSuccess])

  const handleSwitchSection = () => {
    setActiveSection(index)
    toggleQuestionForm(false)
  }

  if (isLoading) return <div>Loading Section...</div>

  return (
    <>
      <button
        type='button'
        className={`w-full m-0 side-nav-item${isActive ? '-active' : ''} flex justify-between`}
        onClick={handleSwitchSection}
      >
        {section.title || `Section ${index + 1}`}
        <DropdownArrowDownIcon
          style={{
            transform: `rotate(${isActive ? 180 : 0}deg)`,
          }}
        />
      </button>
      <div>
        <QuestionBubbles questions={section.questions} isActive={isActive} />
      </div>
    </>
  )
}

Section.propTypes = {
  index: PropTypes.number.isRequired,
  section: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
}

export default Section
