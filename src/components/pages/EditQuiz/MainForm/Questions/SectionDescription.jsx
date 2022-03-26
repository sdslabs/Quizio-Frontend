import React, { useEffect } from 'react';
import _ from 'lodash';
import { useAddQuestion } from '@api/quizzes/useQuestions';
import { useUpdateSection } from '@api/quizzes/useSections';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import TextField from '@components/Input/TextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';

const SectionDescription = () => {
  // Global create quiz store
  const {
    sections,
    activeSectionIndex,
    updateSection,
    addQuestionToSection,
    addQuestion,
    toggleQuestionForm,
  } = useCreateQuizStore();

  // Add question
  const {
    mutate: mutateQuestions,
    isLoading: isAddingQuestion,
    data: questionData,
    isSuccess: isQuestionAdded,
  } = useAddQuestion();

  // Update section
  const {
    mutate: mutateSection,
    isLoading: isSectionUpdating,
    isSuccess: isSectionUpdated,
  } = useUpdateSection();

  const currentSection = sections[activeSectionIndex];
  const setSectionTitle = (title) => updateSection({ ...currentSection, title });
  const setSectionDescription = (description) => updateSection({ ...currentSection, description });

  const handleSave = () => {
    log('Saving section!');
    mutateSection({
      sectionID: currentSection.id,
      body: _.omit(currentSection, ['id', 'questions']),
    });
  };

  useEffect(() => {
    if (isSectionUpdated) {
      log('Section updated in backend, now update questions.');
      if (currentSection.questions.length === 0) {
        mutateQuestions({ sectionID: currentSection.id });
      } else toggleQuestionForm(true);
    }
  }, [isSectionUpdated]);

  useEffect(() => {
    log('{Section Desc page} activeSectionIndex update: ', {
      activeSectionIndex,
    });
  }, [activeSectionIndex]);

  useEffect(() => {
    if (isQuestionAdded) {
      const question = questionData.data?.data?.question;
      if (question) {
        addQuestionToSection(question.quizioID);
        addQuestion(question);
        toggleQuestionForm(true);
      }
    }
  }, [isQuestionAdded]);

  return (
      <div className="quiz-details">
          <div className="quiz-details-title">
              {currentSection ? 'Section Description' : 'Add New Section To Begin'}
          </div>
          {currentSection && (
          <div className="quiz-details-name">
              <TextField
                label="Section Name"
                limit={50}
                val={currentSection?.title || ''}
                setVal={setSectionTitle}
                placeholder="Enter Section Name"
                id="section-name"
              />
              <p className="text-sm text-grey-N6 mt-6 mb-2">Section Instructions</p>
              <MarkdownTextField
                id="section-description"
                val={currentSection?.description || ''}
                limit={1500}
                placeholder="Enter instructions for this section"
                setVal={setSectionDescription}
              />
              <div className="w-40 ml-auto mt-8">
                  {isSectionUpdating || isAddingQuestion ? (
              'Saving...'
            ) : (
                <PrimaryCTA text="Save &amp; Continue" onClick={handleSave} />
            )}
              </div>
          </div>
      )}
      </div>
  );
};

export default SectionDescription;
