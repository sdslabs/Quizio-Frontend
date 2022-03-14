import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import { useGetQuestion, useUpdateQuestion } from '@api/quizzes/useQuestions';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';
import Subjective from './Subjective';
import MCQ from './MCQ';

const Question = () => {
  // Local states
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('mcq');
  const [checkerNotes, setCheckersNotes] = useState('');
  const [mcqChoice, setMcqChoice] = useState([]);
  const [marks, setMarks] = useState(0);

  const [currentQuestionID, setCurrentQuestionID] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  // Global create quiz store
  const { sections, activeSectionIndex, activeQuestion } = useCreateQuizStore();

  // Question update mutation
  const {
    isLoading: isUpdateLoading,
    mutate: mutateQuestion,
  } = useUpdateQuestion();

  // Get question query
  const { isSuccess: fetchSuccess, data: questionData } = useGetQuestion(
    currentQuestionID,
  );

  const questionTypeOptions = [
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'subjective', label: 'Subjective' },
  ];

  const handleSave = async () => {
    const requestBody = {};

    log('Handle save!');
    mutateQuestion({
      questionID: currentQuestionID,
      body: requestBody,
    });
  };

  useEffect(() => {
    if (fetchSuccess) {
      log('Fetched question :)', { question: questionData?.data?.data });
    } else {
      log('Failed to fetch question :(', { currentQuestionID });
    }
  }, [fetchSuccess]);

  useEffect(() => {
    // log('sections update!', { sections, section: sections[activeSectionIndex] });
    setCurrentSection(sections[activeSectionIndex]);
  }, [sections]);

  useEffect(() => {
    // log('{Question component}: ', {
    //   currentQuestionID: sections[activeSectionIndex].questions[activeQuestion],
    // });

    setCurrentQuestionID(sections[activeSectionIndex].questions[activeQuestion]);
  }, [activeQuestion, activeSectionIndex, sections]);

  useEffect(() => {
    // log('ACTIVE QUESTION UPDATED', { activeQuestion });
  }, [activeQuestion]);

  const handleQuestionType = (selectedOption) => setQuestionType(selectedOption.value);

  return (
      <div className="quiz-details w-full">
          <div className="font-bold text-3xl">{currentSection?.title || ''}</div>
          <div className="quiz-question w-full">
              <div className="question-type-dropdown flex w-full justify-between">
                  <div className="question-title mt-6 mb-6 contentEditable">
                      Question
                      {' '}
                      {activeQuestion + 1}
                  </div>
                  <Select
                    options={questionTypeOptions}
                    onChange={handleQuestionType}
                    defaultValue="mcq"
                    className="text-sm p-5 w-200"
                  />
              </div>
              <MarkdownTextField
                id="question-description"
                val={questionText}
                placeholder="Enter question here"
                setVal={setQuestionText}
              />
              {questionType === 'subjective' ? (
                  <Subjective
                    marks={marks}
                    setMarks={setMarks}
                    checkerNotes={checkerNotes}
                    setCheckersNotes={setCheckersNotes}
                  />
        ) : (
            <MCQ
              marks={marks}
              setMarks={setMarks}
              mcqChoice={mcqChoice}
              setMcqChoice={setMcqChoice}
            />
        )}
              <div className="w-40 ml-auto mt-8">
                  {isUpdateLoading ? (
            'Saving...'
          ) : (
              <PrimaryCTA text="Save Changes" onClick={handleSave} />
          )}
              </div>
          </div>
      </div>
  );
};

export default Question;
