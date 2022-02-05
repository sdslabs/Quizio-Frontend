import create from 'zustand';

const defaultSection = {
    id: '',
    title: 'Section 1',
    description: '',
    questions: [],
};

const useCreateQuizStore = create((set) => ({
    /* Active side nav option */
    currentStage: '',
    /* Total sections in a quiz */
    sections: [],
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
    updateSection: (update) => set((state) => {
        const activeSection = state.sections[state.activeSectionIndex];
        const updatedSection = { ...activeSection, ...update };

        return {
            sections: [
                ...state.sections.slice(0, state.activeSectionIndex),
                updatedSection,
                ...state.sections.slice(state.activeSectionIndex + 1),
            ],
        };
    }),

    /* Add new question using ID */
    addQuestion: (questionId) => set((state) => {
        const activeSection = state.sections[state.activeSectionIndex];
        const newQuestion = { id: questionId };
        return {
            sections: [
                ...state.sections.slice(0, state.activeSectionIndex),
                {
                    ...activeSection,
                    questions: [...activeSection.questions, newQuestion],
                },
                ...state.sections.slice(state.activeSectionIndex + 1),
            ],
        };
    }),

    /* Toggle active question */
    setActiveQuestion: (index) => set(() => ({ activeQuestionIndex: index })),

    /* Toggle activate question form */
    toggleQuestionForm: (flag) => set(() => ({ showQuestion: flag })),
}));

export default useCreateQuizStore;
