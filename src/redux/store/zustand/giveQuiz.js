import create from 'zustand';

const useGiveQuizStore = create((set) => ({
	quiz: {},
	sections: [],

	/* Quiz ID */
	setQuiz: (quiz) => set(() => ({ quiz })),
	/* Add new section */
	setSections: (sections) => set(() => ({ sections })),
}));

export default useGiveQuizStore;
