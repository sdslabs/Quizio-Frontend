import create from 'zustand';
import _ from 'lodash';

const defaultSection = {
    id: '',
    title: 'Section 1',
    description: '',
    questions: [],
};

const useCreateQuizStore = create((set) => ({
    /* Active side nav option */
    currentStage: 'Quiz Details',
    /* Total sections in a quiz */
    sections: [],
    /* Total Questions */
    questions: [],
    /* Active Section index */
    activeSectionIndex: 0,
    /* Active Question index */
    activeQuestion: 0,
    /* Activate Question Form */
    showQuestion: false,

    /* Toggle side nav option */
    setCurrentStage: (stage) => set(() => ({ currentStage: stage })),

    /* Toggle active section */
    setActiveSection: (index) => set(() => ({ activeSectionIndex: index })),

    /* Add new section using ID */
    addSection: (sectionId) => set((state) => {
        const newSection = { ...defaultSection, id: sectionId, title: `Section ${state.sections.length + 1}` };
        return {
            sections: [...state.sections, newSection],
        };
    }),

    /* Update section details for current section */
    updateSection: (update, id) => set((state) => {
        const sectionIdx = id ? _.findIndex(state.sections, { id }) : state.activeSectionIndex;
        const staleSection = state.sections[sectionIdx];
        const updatedSection = { ...staleSection, ...update };

        return {
            sections: [
                ...state.sections.slice(0, sectionIdx),
                updatedSection,
                ...state.sections.slice(sectionIdx + 1),
            ],
        };
    }),

    /* Add new question ID to section */
    addQuestionToSection: (questionId) => set((state) => {
        const activeSection = state.sections[state.activeSectionIndex];
        return {
            sections: [
                ...state.sections.slice(0, state.activeSectionIndex),
                {
                    ...activeSection,
                    questions: [...activeSection.questions, questionId],
                },
                ...state.sections.slice(state.activeSectionIndex + 1),
            ],
        };
    }),

    /* Add question with details */
    addQuestion: (question) => set((state) => ({ questions: [...state.questions, question] })),

    /* Toggle active question */
    setActiveQuestion: (index) => set(() => ({ activeQuestionIndex: index })),

    /* Toggle activate question form */
    toggleQuestionForm: (flag) => set(() => ({ showQuestion: flag })),
}));

export default useCreateQuizStore;
