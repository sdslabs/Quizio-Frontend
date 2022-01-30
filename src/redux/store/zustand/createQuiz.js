import create from 'zustand';

const defaultSection = {
    id: '',
    label: 'Section 1',
    questions: [],
};

const useCreateQuizStore = create((set) => ({
    /* Active side nav option */
    currentStage: '',
    /* Total sections in a quiz */
    sections: [],
    /* Active Section index */
    activeSection: 0,
    /* Active Question index */
    activeQuestion: 0,

    /* Toggle side nav option */
    setCurrentStage: (stage) => set(() => ({ currentStage: stage })),

    /* Toggle active section */
    setActiveSection: (index) => set(() => ({ activeSectionIndex: index })),

    /* Add new section using ID */
    addSection: (sectionId) => set((state) => {
        const newSection = { ...defaultSection, id: sectionId, label: `Section ${state.sections.length + 1}` };
        return {
            sections: [...state.sections, newSection],
        };
    }),

    /* Add new question using ID */
    addQuestion: (questionId) => set((state) => {
        const section = state.sections[state.activeSection];
        const newQuestion = { id: questionId };
        return {
            sections: [
                ...state.sections.slice(0, state.activeSection),
                {
                    ...section,
                    questions: [...section.questions, newQuestion],
                },
                ...state.sections.slice(state.activeSection + 1),
            ],
        };
    }),

    /* Toggle active question */
    setActiveQuestion: (index) => set(() => ({ activeQuestionIndex: index })),
}));

export default useCreateQuizStore;
