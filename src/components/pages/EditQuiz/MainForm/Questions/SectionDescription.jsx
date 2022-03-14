import React, { useEffect } from 'react';
import _ from 'lodash';
import { useAddQuestion } from '@api/quizzes/useQuestions';
import { useUpdateSection } from '@api/quizzes/useSections';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import log from '@utils/log';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import TextField from '@components/Input/TextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';

const SectionDescription = () => {
  const {
    sections,
    activeSectionIndex,
    updateSection,
    addQuestionToSection,
    addQuestion,
    toggleQuestionForm,
  } = useCreateQuizStore();
  const currentSection = sections[activeSectionIndex];
  log(activeSectionIndex);
  const setSectionTitle = (value) => updateSection({ ...currentSection, title: value });
  const setSectionDescription = (value) => updateSection({ ...currentSection, description: value });

  const { isLoading, mutate: mutateSection, isSuccess } = useUpdateSection();

  const {
    isLoading: isAddingQuestion,
    data: questionData,
    mutate: mutateQuestions,
    isSuccess: isQuestionAdded,
  } = useAddQuestion();

  const handleSave = () => {
    mutateSection({
      sectionId: currentSection.id,
      body: _.omit(currentSection, ['id', 'questions']),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      if (currentSection.questions.length === 0) {
        mutateQuestions({ sectionId: currentSection.id });
      } else toggleQuestionForm(true);
    }
  }, [isSuccess]);

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
                limit={10}
                val={currentSection.title}
                setVal={setSectionTitle}
                placeholder="Enter Section Name"
                id="section-name"
              />
              <p className="text-sm text-grey-N6 mt-6 mb-2">Section Instructions</p>
              <MarkdownTextField
                id="section-description"
                val={currentSection.description}
                limit={1500}
                placeholder="Enter instructions for this section"
                setVal={setSectionDescription}
              />
              <div className="w-40 ml-auto mt-8">
                  {isLoading || isAddingQuestion ? (
              'Saving...'
            ) : (
                <PrimaryCTA text="Save & Continue" onClick={handleSave} />
            )}
              </div>
          </div>
      )}
      </div>
  );
};

export default SectionDescription;
