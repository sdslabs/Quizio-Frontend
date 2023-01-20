import {
  useAddChoiceToQuestion,
  useDeleteAllChoicesInQuestion,
  useUpdateQuestion,
} from '@api/quizzes/useQuestions'
import { omit } from 'lodash'
import { useEffect } from 'react'

const useSaveQuestion = (newQues) => {
  const { isLoading, isSuccess, mutate: mutateQuestion } = useUpdateQuestion()

  const { mutate: addChoiceToQuestion } = useAddChoiceToQuestion()

  const { isSuccess: deleteChoicesInQuestionSuccess, mutate: deleteChoicesInQuestion } =
    useDeleteAllChoicesInQuestion()

  const onSave = () => {
    mutateQuestion({
      questionID: newQues.id,
      body: omit(newQues, ['id', 'choices']),
    })

    if (newQues.type === 'mcq') {
      deleteChoicesInQuestion({ questionID: newQues.id })
    }
  }

  useEffect(() => {
    if (deleteChoicesInQuestionSuccess) {
      newQues.choices.map((choice) =>
        addChoiceToQuestion({
          questionID: newQues.id,
          body: choice,
        }),
      )
    }
  }, [deleteChoicesInQuestionSuccess])

  return {
    onSave,
    isLoading,
    isSuccess,
  }
}

export default useSaveQuestion
