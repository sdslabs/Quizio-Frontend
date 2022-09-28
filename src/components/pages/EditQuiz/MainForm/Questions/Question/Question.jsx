import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import {
  useAddChoiceToQuestion,
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
  const [questionText, setQuestionText] = useState(null);
  const [questionTextError, setQuestionTextError] = useState(null);
  const [questionType, setQuestionType] = useState('mcq');
  const [checkerNotes, setCheckersNotes] = useState('');
  const [marks, setMarks] = useState(0);
  const [marksError, setMarksError] = useState(null);
  const [currentQuestionID, setCurrentQuestionID] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [choices, setChoices] = useState([]);
  const [choicesError, setChoicesError] = useState(null);

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
    // isLoading: AddChoiceToQuestionLoading,
    mutate: AddChoiceToQuestion,
  } = useAddChoiceToQuestion();

  // discuss this design with stuti
  const validateQuestionData = async () => {
    if (questionText === null) {
      setQuestionTextError('Please enter the question details');
    } else {
      setQuestionTextError('');
    }
    if (marks === 0) {
      setMarksError('Please enter the marks');
    } else {
      setMarksError('');
    }
    if (choices === []) {
      setChoicesError('Please fill atleast one choice');
    } else {
      setChoicesError('');
    }
    return (!questionText === '' && !marks === 0 && !choices === []);
  };

  const handleSave = async () => {
    const isError = validateQuestionData();
    const body = {
      question: questionText,
      type: questionType,
      checkerNotes,
      maxMarks: marks,
      minMarks: '0',
    };
    console.log(isError, 'printing is error');
    log('Handle save!', { body });
    // if (!isError) {
    console.log('in mutate question');
    mutateQuestion({
      questionID: currentQuestionID,
      body,
    });
    // }

    if (questionType === 'mcq') {
      log('MCQ Type save!', { choices });
      AddChoiceToQuestion({
        questionID: currentQuestionID,
        body: choices,
      });
    }
  };

  const handleQuestionType = async (selectedOption) => {
    log('toggle:', { questionType, newType: selectedOption.value });
    if (questionType !== selectedOption.value) {
      mutateToggleQuestion({ questionID: currentQuestionID });
      setQuestionType(selectedOption.value);
    }
  };

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
      setQuestionType(originalType);
      setCheckersNotes(originalCheckerNotes);
      setMarks(originalMarks);
      setChoices(originalChoices);
      addQuestion(questionData?.data?.data?.question);
    } else {
      log('Failed to fetch question :(', { currentQuestionID });
    }
  }, [fetchSuccess]);

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
      console.log('og', originalMarks);
      setQuestionText(originalQuestion);
      setQuestionType(originalType);
      setCheckersNotes(originalCheckerNotes);
      setMarks(originalMarks);
      log('changedquestion', mutatedQuestionData);
      updateQuestion(mutatedQuestionData?.data?.data?.updatedQuestion);
    }
  }, [isUpdateSuccess]);

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
      setQuestionType(currentQuestionData.type);
      setCheckersNotes(currentQuestionData.checkerNotes);
      setMarks(currentQuestionData.maxMarks);
      setChoices(currentQuestionData.choices);
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
                        Change question type (choose):
                        <Select
                          options={questionTypeOptions}
                          onChange={handleQuestionType}
                          val={questionType}
                          defaultValue="mcq"
                          className="text-sm p-5 w-200"
                        />
                    </div>
                </div>
                <MarkdownTextField
                  id="question-description"
                  val={questionText || ''}
                  placeholder="Enter question here"
                  setVal={setQuestionText}
                  error={questionTextError}
                />
                {isToggleLoading ? (
                    <div>Toggling question type...</div>
            ) : (
                <QuestionInputArea
                  choices={choices}
                  setChoices={setChoices}
                  questionType={questionType}
                  marks={marks ? marks.toString() : ' '}
                  setMarks={setMarks}
                  checkerNotes={checkerNotes}
                  setCheckersNotes={setCheckersNotes}
                  marksError={marksError}
                  choicesError={choicesError}
                />
            )}
                <div className="w-40 ml-auto mt-8">
                    {isUpdateLoading ? (
                        <PrimaryCTA text="Saving..." onClick={() => { }} disabled />
              ) : (
                  <PrimaryCTA text="Save Question" onClick={handleSave} />
              )}
                </div>
            </>
        )}
          </div>
      </div>
  );
};

export default Question;
