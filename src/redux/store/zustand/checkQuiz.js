import create from 'zustand';

const useCheckQuizStore = create((set) => ({
	quiz: {},
	sections: [],
	currentQuestion: null,
	currentQuestionIndex: null,
	currentSection: null,

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
}));

export default useCheckQuizStore;
