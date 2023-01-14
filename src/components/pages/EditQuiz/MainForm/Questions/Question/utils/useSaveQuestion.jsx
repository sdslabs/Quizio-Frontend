import { useUpdateQuestion } from '@api/quizzes/useQuestions'
import { omit } from 'lodash'

const useSaveQuestion = (newQues) => {
  const { isLoading, isSuccess, mutate: mutateQuestion } = useUpdateQuestion()

  return {
    onSave: () =>
      mutateQuestion({
        questionID: newQues.id,
        body: omit(newQues, ['id']),
      }),
    isLoading,
    isSuccess,
  }
}

export default useSaveQuestion
