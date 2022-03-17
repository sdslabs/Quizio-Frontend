import log from '@utils/log';
import create from 'zustand';
import { find } from 'lodash';

const useGiveQuizStore = create((set) => ({
    quiz: {},
    sections: [],
    currentQuestion: null,
    currentQuestionIndex: null,
    currentSection: null,
    totalQuestions: 0,
    answeredQuestions: [],
    markedQuestions: [],
    markedAnsweredQuestions: [],

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
    setTotalQuestions: (totalQuestions) => set(() => ({ totalQuestions })),
    /* Open a question */
    addAnsweredQuestion: (question) => set((state) => {
        log('{zustand} addAsnweredQuestion', { question, answeredquestions: state.answeredQuestions });
        const index = state.answeredQuestions.findIndex((q) => q === question);
        if (index === -1) {
            state.answeredQuestions.push(question);
        }
    }),
    /* opens the first question of the current section */
    startAnsweringSection: (section) => set((state) => {
        const currentSection = find(state.sections, { quizioID: section });
        return { currentQuestion: currentSection?.questions[0], currentQuestionIndex: 1 };
    }),
    switchToNextQuestion: (section) => set((state) => {
        const currentSection = find(state.sections, { quizioID: section });
        return { currentQuestion: currentSection?.questions[state.currentQuestionIndex], currentQuestionIndex: state.currentQuestionIndex + 1 };
    }),
}));

export default useGiveQuizStore;
