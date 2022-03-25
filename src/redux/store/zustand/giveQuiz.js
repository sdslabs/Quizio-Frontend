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
    setAnsweredQuestions: (answeredQuestions) => set(() => ({ answeredQuestions })),
    setMarkedQuestions: (markedQuestions) => set(() => ({ markedQuestions })),
    setMarkedAnsweredQuestions: (markedAnsweredQuestions) => set(() => ({ markedAnsweredQuestions })),
    /* Open a question */
    addAnsweredQuestion: (question) => set((state) => {
        log('{zustand} addAnsweredQuestion', { question, answeredquestions: state.answeredQuestions });
        const index = state.answeredQuestions.findIndex((q) => q === question);
        if (index === -1) {
            state.answeredQuestions.push(question);
        }
    }),
    removeAnsweredQuestion: (question) => set((state) => ({ answeredQuestions: state.answeredQuestions.filter((val) => val !== question) })),

    addMarkedQuestion: (question) => set((state) => {
        log('{zustand} addAnsweredQuestion', { question, markedQuestions: state.markedQuestions });
        const index = state.markedQuestions.findIndex((q) => q === question);
        if (index === -1) {
            state.markedQuestions.push(question);
        }
    }),
    removeMarkedQuestion: (question) => set(
        (state) => ({ markedQuestions: state.markedQuestions.filter((val) => val !== question) }),
    ),

    addMarkedAnsweredQuestion: (question) => set((state) => {
        log('{zustand} addAnsweredQuestion', { question, markedAnsweredQuestions: state.markedAnsweredQuestions });
        const index = state.markedAnsweredQuestions.findIndex((q) => q === question);
        if (index === -1) {
            state.markedAnsweredQuestions.push(question);
        }
    }),
    removeMarkedAnsweredQuestion: (question) => set(
        (state) => ({ markedAnsweredQuestions: state.markedAnsweredQuestions.filter((val) => val !== question) }),
    ),
    /* opens the first question of the current section */
    startAnsweringSection: (section) => set((state) => {
        const currentSection = find(state.sections, { quizioID: section });
        return { currentQuestion: currentSection?.questions[0], currentQuestionIndex: 1, currentSection: currentSection?.title };
    }),
    switchToNextQuestion: (section) => set((state) => {
        const currentSection = find(state.sections, { quizioID: section });
        return { currentQuestion: currentSection?.questions[state.currentQuestionIndex], currentQuestionIndex: state.currentQuestionIndex + 1 };
    }),
}));

export default useGiveQuizStore;
