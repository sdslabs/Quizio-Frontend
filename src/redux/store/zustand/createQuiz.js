import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import _ from 'lodash';

const defaultSection = {
    id: '',
    title: 'Section 1',
    description: '',
    questions: [],
};

const useCreateQuizStore = create((set) => ({
  /* Quiz ID */
  currentID: '',
  /* Quiz creation stage */
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
  /* Quiz Data Current */
  currentQuizData: null,
  currentQuestionData: null,

  /* Set Current Quiz ID */
  setCurrentID: (id) => set(() => ({ currentID: id })),
  /* Toggle side nav option */
  setCurrentStage: (stage) => set(() => ({ currentStage: stage })),
  /* Toggle active section */
  setActiveSection: (index) => set(() => ({ activeSectionIndex: index })),
  /* Add new section using ID */
  addSection: (sectionID) =>
    set((state) => {
      const newSection = {
        ...defaultSection,
        id: sectionID,
        title: `Section ${state.sections.length + 1}`,
      }
      if (!state.sections.find((section) => section.id === sectionID)) {
        return {
          sections: [...state.sections, newSection],
        }
      }
      return {
        sections: [...state.sections],
      }
    }),
  /* Update section details for current section */
  updateSection: (update, id) =>
    set((state) => {
      const sectionIDx = id ? _.findIndex(state.sections, { id }) : state.activeSectionIndex
      const staleSection = state.sections[sectionIDx]
      const updatedSection = { ...staleSection, ...update }

      return {
        sections: [
          ...state.sections.slice(0, sectionIDx),
          updatedSection,
          ...state.sections.slice(sectionIDx + 1),
        ],
      }
    }),
  /* Add new question ID to section */
  addQuestionToSection: (questionID) =>
    set((state) => {
      const activeSection = state.sections[state.activeSectionIndex]
      return {
        sections: [
          ...state.sections.slice(0, state.activeSectionIndex),
          {
            ...activeSection,
            questions: [...activeSection.questions, questionID],
          },
          ...state.sections.slice(state.activeSectionIndex + 1),
        ],
      }
    }),
  /* Add question with details */
  addQuestion: (question) => set((state) => ({ questions: [...state.questions, question] })),

  updateQuestion: (question) =>
    set((state) => {
      const oldQuestionID = state.questions.findIndex(
        (oldQuestion) => oldQuestion.quizioID === question.quizioID,
      )
      const stateCopy = [...state.questions]
      stateCopy[oldQuestionID] = question
      return stateCopy
    }),

  /* Remove section from quiz */
  removeSection: (idx) => {
    set((state) => {
      const sectionIdx = idx
      state.sections = [
        ...state.sections.slice(0, sectionIdx),
        ...state.sections.slice(sectionIdx + 1),
      ]
    })
  },

  /* Remove question from section */
  deleteQuestion: () => {
    set((state) => {
      const activeSection = state.sections[state.activeSectionIndex]
      const questionIdx = state.activeQuestion
      state.sections = [
        ...state.sections.slice(0, state.activeSectionIndex),
        {
          ...activeSection,
          questions: [
            ...activeSection.questions.slice(0, questionIdx),
            ...activeSection.questions.slice(questionIdx + 1),
          ],
        },
        ...state.sections.slice(state.activeSectionIndex + 1),
      ]
    })
  },

  /* Toggle active question */
  setActiveQuestion: (index) => set(() => ({ activeQuestion: index })),
  /* Toggle activate question form */
  toggleQuestionForm: (flag) => set(() => ({ showQuestion: flag })),
  setQuizData: (data) => set(() => ({ currentQuizData: data })),
  resetQuizData: () => set(() => ({ currentQuizData: null })),
  setQuestionData: (data) => set(() => ({ currentQuestionData: data })),
  resetQuestionData: () => set(() => ({ currentQuestionData: null })),
}))

mountStoreDevtool('createQuizStore', useCreateQuizStore);
export default useCreateQuizStore;
