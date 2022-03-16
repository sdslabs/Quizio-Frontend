import create from 'zustand';

const useGiveQuizStore = create((set) => ({
    quiz: {},
    sections: [],
    currentQuestion: null,
    currentQuestionIndex: null,
    currentSection: null,
    answeredQuestions: [],

    /* Quiz Id */
    setQuiz: (quiz) => set(() => ({ quiz })),
    /* Add new section */
    setSections: (sections) => set(() => ({ sections })),
    /* Open a question */
    setCurrentQuestion: (currentQuestion) => set(() => ({ currentQuestion })),
    /* Open a question */
    setCurrentQuestionIndex: (currentQuestionIndex) => set(() => ({ currentQuestionIndex })),
    /* Open a question */
    setCurrentSection: (currentSection) => set(() => ({ currentSection })),
    /* Open a question */
    addAnsweredQuestion: (question) => set((state) => {
        console.log('question');
        state.answeredQuestions.push(question);
}),
}));

export default useGiveQuizStore;
