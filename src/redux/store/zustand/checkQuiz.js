import create from 'zustand';

const useCheckQuizStore = create((set) => ({
    quiz: {},
    sections: [],
    currentQuestion: null,

    /* Quiz Id */
    setQuiz: (quiz) => set(() => ({ quiz })),
    /* Add new section */
    setSections: (sections) => set(() => ({ sections })),
    /* Open a question */
    setCurrentQuestion: (currentQuestion) => set(() => ({ currentQuestion })),
}));

export default useCheckQuizStore;
