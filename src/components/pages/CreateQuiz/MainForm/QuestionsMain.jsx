import React from 'react';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import TextField from '@components/Input/TextField';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { useUpdateSection } from '@api/quizzes/useSections';
import _ from 'lodash';

const Questions = () => {
    const { showQuestion } = useCreateQuizStore();

    if (showQuestion) return <div>Question Creation Form</div>;
    return <SectionDescription />;
};

const SectionDescription = () => {
    const { sections, activeSectionIndex, updateSection } = useCreateQuizStore();
    const currentSection = sections[activeSectionIndex];

    const setSectionTitle = (value) => updateSection({ ...currentSection, title: value });
    const setSectionDescription = (value) => updateSection({ ...currentSection, description: value });

    const { isLoading, mutate: mutateSection } = useUpdateSection();

    const handleSave = () => {
        mutateSection({ sectionId: currentSection.id, body: _.omit(currentSection, ['id', 'questions']) });
    };

    return (
        <div className="quiz-details">
            <div className="quiz-details-title">{currentSection ? 'Section Description' : 'Add New Section To Begin'}</div>
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
                <p className="text-sm text-grey-N6 mt-6 mb-2">
                    Section Instructions
                </p>
                <MarkdownTextField
                  id="section-description"
                  val={currentSection.description}
                  limit={1500}
                  placeholder="Enter instructions for this section"
                  setVal={setSectionDescription}
                />
                <div className="w-40 ml-auto mt-8">
                    {isLoading ? 'Saving...' : <PrimaryCTA text="Save & Continue" onClick={handleSave} />}
                </div>
            </div>
)}
        </div>
    );
};

export default Questions;
