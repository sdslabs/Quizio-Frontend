import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import {
  useAddChoiceToQuestion,
  useDeleteAllChoicesInQuestion,
  useGetQuestion,
  useToggleQuestionType,
  useUpdateQuestion,
} from '@api/quizzes/useQuestions';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';
import Title from './Title';
import QuestionInputArea from './QuestionInputArea';

const Question = () => {
  // Local states
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState();
  const [checkerNotes, setCheckersNotes] = useState('');
  const [marks, setMarks] = useState(0);
  const [currentQuestionID, setCurrentQuestionID] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [choices, setChoices] = useState([]);

  // Question types
  const questionTypeOptions = [
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'subjective', label: 'Subjective' },
  ];

  // Global create quiz store
  const {
    questions,
    sections,
    activeSectionIndex,
    activeQuestion,
    addQuestion,
    updateQuestion,
  } = useCreateQuizStore();

  // Question update mutation
  const {
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    mutate: mutateQuestion,
    data: mutatedQuestionData,
  } = useUpdateQuestion();

  // Question toggle mutation
  const {
    isLoading: isToggleLoading,
    isSuccess: isToggleSuccess,
    mutate: mutateToggleQuestion,
  } = useToggleQuestionType();

  // Get question query
  const {
    isSuccess: fetchSuccess,
    isFetching: isFetchingQuestion,
    data: questionData,
  } = useGetQuestion(currentQuestionID);
  // Add choice to question
  const {
    // data: AddChoiceToQuestionData,
    // isSuccess: AddChoiceToQuestionSuccess,
    mutate: AddChoiceToQuestion,
  } = useAddChoiceToQuestion();

  // Delete choice in question
  const {
    // data: DeleteChoicesInQuestionData,
    isSuccess: DeleteChoicesInQuestionSuccess,
    mutate: DeleteChoicesInQuestion,
  } = useDeleteAllChoicesInQuestion();

  const handleSave = async () => {
    const body = {
      question: questionText,
      type: questionType.value,
      checkerNotes,
      maxMarks: marks,
      minMarks: '0',
    };

    log('Handle save!', { body });
    mutateQuestion({
      questionID: currentQuestionID,
      body,
    });

    if (questionType?.value === 'mcq') {
      log('MCQ Type save!', { choices });
      log('deleting all old choices');
      DeleteChoicesInQuestion({ questionID: currentQuestionID });
    }
  };
  const setQuestionTypeWrapper = (type) => {
    if (type === 'mcq') {
      setQuestionType({ value: 'mcq', label: 'Multiple Choice' });
    } else if (type === 'subjective') {
      setQuestionType({ value: 'subjective', label: 'Subjective' });
    }
  };

  const handleQuestionType = async (selectedOption) => {
    log('toggle:', { questionType, newType: selectedOption.value });
    if (questionType?.value !== selectedOption.value) {
      mutateToggleQuestion({ questionID: currentQuestionID });
      setQuestionTypeWrapper(selectedOption.value);
    }
  };

  useEffect(() => {
    log('choices deleted! Now saving the new choices!');
    Promise.all(
      choices.map((choice) => {
        log({ questionID: currentQuestionID, body: choice });
        return AddChoiceToQuestion({
          questionID: currentQuestionID,
          body: choice,
        });
      }),
    );
  }, [DeleteChoicesInQuestionSuccess]);

  useEffect(() => {
    log('successfully toggled!');
  }, [isToggleSuccess]);

  useEffect(() => {
    log('fetched question!');
    if (fetchSuccess) {
      const {
        question: originalQuestion,
        choices: originalChoices,
        type: originalType,
        checkerNotes: originalCheckerNotes,
        maxMarks: originalMarks,
      } = questionData?.data?.data?.question;
      log('Fetched question :)', {
        originalQuestion: questionData?.data?.data?.question,
      });
      setQuestionText(originalQuestion);
      setQuestionTypeWrapper(originalType);
      setCheckersNotes(originalCheckerNotes);
      setMarks(originalMarks || 0);
      setChoices(originalChoices);
      addQuestion(questionData?.data?.data?.question);
    } else {
      log('Failed to fetch question :(', { currentQuestionID });
      setQuestionText('');
      setQuestionType();
      setCheckersNotes('');
      setMarks(0);
      setChoices([]);
    }
  }, [fetchSuccess, questionData]);

  useEffect(() => {
    log(
      'sections update!',
      { sections, section: sections[activeSectionIndex] },
      false,
    );
    setCurrentSection(sections[activeSectionIndex]);
  }, [sections]);

  useEffect(() => {
    log('{Question component}: ', {
      currentQuestionID: sections[activeSectionIndex].questions[activeQuestion],
    });

    setCurrentQuestionID(sections[activeSectionIndex].questions[activeQuestion]);
  }, [activeQuestion, activeSectionIndex, sections]);

  useEffect(() => {
    log('ACTIVE QUESTION UPDATED', { activeQuestion });
    setCurrentQuestionID(sections[activeSectionIndex].questions[activeQuestion]);
  }, [activeQuestion]);

  useEffect(() => {
    log('update success: ', { isUpdateSuccess, mutatedQuestionData });
    if (isUpdateSuccess) {
      const {
        question: originalQuestion,
        // choices: originalChoices,
        type: originalType,
        checkerNotes: originalCheckerNotes,
        maxMarks: originalMarks,
      } = mutatedQuestionData?.data?.data?.updatedQuestion;
      log('Fetched question :)', {
        originalQuestion: questionData?.data?.data?.question,
      });
      setQuestionText(originalQuestion);
      setQuestionTypeWrapper(originalType);
      setCheckersNotes(originalCheckerNotes);
      setMarks(originalMarks || 0);
      updateQuestion(mutatedQuestionData?.data?.data?.updatedQuestion);
    }
  }, [isUpdateSuccess, mutatedQuestionData]);

  useEffect(() => {
    log('first load...');
  }, []);

  useEffect(() => {
    const currentQuestionData = questions.find(
      (q) => q.quizioID === currentQuestionID,
    );
    log('update current questionID:', {
      currentQuestionID,
      currentQuestionData,
    });
    if (currentQuestionData) {
      setQuestionText(currentQuestionData.question);
      setQuestionTypeWrapper(currentQuestionData.type);
      setCheckersNotes(currentQuestionData.checkerNotes);
      setMarks(currentQuestionData.marks || 0);
    }
  }, [currentQuestionID]);

  return (
      <div className="quiz-details w-full">
          <div className="font-bold text-3xl">{currentSection?.title || ''}</div>
          <div className="quiz-question w-full">
              {isFetchingQuestion ? (
                  <div>Loading Question...</div>
        ) : (
            <>
                <div className="question-type-dropdown flex w-full justify-between">
                    <Title activeQuestion={activeQuestion} />
                    <div className="flex items-center">
                        Change question type:
                        <Select
                          options={questionTypeOptions}
                          onChange={handleQuestionType}
                          value={questionType}
                          className="text-sm p-5 w-200"
                        />
                    </div>
                </div>
                <MarkdownTextField
                  id="question-description"
                  val={questionText || ''}
                  placeholder="Enter question here"
                  setVal={setQuestionText}
                />
                {isToggleLoading ? (
                    <div>Toggling question type...</div>
            ) : (
                <QuestionInputArea
                  choices={choices}
                  setChoices={setChoices}
                  questionType={questionType?.value}
                  marks={marks.toString()}
                  setMarks={setMarks}
                  checkerNotes={checkerNotes}
                  setCheckersNotes={setCheckersNotes}
                />
            )}
                <div className="w-40 ml-auto mt-8">
                    {isUpdateLoading ? (
                        <PrimaryCTA text="Saving..." onClick={() => {}} disabled />
              ) : (
                  <PrimaryCTA text="Save Changes" onClick={handleSave} />
              )}
                </div>
            </>
        )}
          </div>
      </div>
  );
};

export default Question;
