import {
  useAddChoicesToQuestion,
  useDeleteAllChoicesInQuestion,
  useUpdateQuestion,
} from '@api/quizzes/useQuestions'
import { omit } from 'lodash'
import { useEffect } from 'react'

const useSaveQuestion = (newQues) => {
  const { isLoading, isSuccess, mutate: mutateQuestion } = useUpdateQuestion()

  const { mutate: addChoicesToQuestion } = useAddChoicesToQuestion()

  const onSave = () => {
    mutateQuestion({
      questionID: newQues.id,
      body: omit(newQues, ['id', 'choices']),
    })

    if (newQues.type === 'mcq'){
      addChoicesToQuestion({
        questionID: newQues.id,
        body: newQues.choices,
      })
    }
  }


  return {
    onSave,
    isLoading,
    isSuccess,
  }
}

export default useSaveQuestion
