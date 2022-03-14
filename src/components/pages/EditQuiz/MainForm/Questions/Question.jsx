import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import { useGetQuestion, useUpdateQuestion } from '@api/quizzes/useQuestions';
import { ReactComponent as MCQIcon } from '@icons/radio_button.svg';
import { ReactComponent as SubjectiveIcon } from '@icons/subjective-icon.svg';
import TextField from '@components/Input/TextField';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import RadioGroup from '@components/Input/RadioGroup';
import log from '@utils/log';

const Question = () => {
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState('mcq');
    const [checkerNotes, setCheckersNotes] = useState('');
    const [mcqChoice, setMcqChoice] = useState([]);
    const [marks, setMarks] = useState(0);
    const [mcqCount, setMcqCount] = useState(0); // checks to see max no. of options is less than 4

    const {
        sections, questions, showQuestion, activeSectionIndex, activeQuestion,
       } = useCreateQuizStore();

      const questionTypeOptions = [
        { value: 'mcq', label: `${<MCQIcon />} Multiple Choice` },
        { value: 'subjective', label: `${<SubjectiveIcon />} Subjective` },
      ];

    log('show question', showQuestion);
    log('show active question', activeQuestion);
    const currentSection = sections[activeSectionIndex];
    const currentQuestion = questions[activeQuestion];

    const { isLoading: isUpdateLoading, mutate: mutateQuestion, isSuccess: isUpdateSuccess } = useUpdateQuestion();
    log(questionType);

    const handleSave = async () => {
        let requestBody = {};
        switch (questionType) {
          case 'mcq':
            requestBody = {
              question: questionText,
              type: questionType,
              choices: mcqChoice,
              // autoCheck
            };
            break;
          case 'subjective':
            log(questionType);
            requestBody = {
              question: questionText,
              type: questionType,
              sectionID: currentSection?.quizioID,
              checkerNotes,
            };
            break;
          default:
            break;
        }
        mutateQuestion({
            questionID: currentQuestion?.quizioID,
            body: requestBody,
            });
    };
    log(isUpdateSuccess);
    const { isLoading: loadingFetchQuestion, isSuccess: fetchSuccess, data } = useGetQuestion(currentQuestion?.quizioID);

    useEffect(() => {
      if (fetchSuccess) {
        log('success');
        log(data);
        log(loadingFetchQuestion);
        log(fetchSuccess);
      }
     }, [fetchSuccess]);

    const handleQuestionType = (selectedOption) => { setQuestionType(selectedOption.value); };

    const handleAddOption = () => {
      setMcqCount(mcqCount + 1);
      setMcqChoice([...mcqChoice, { choice: 'New Option' }]);
     };

    const renderSwitch = (qType) => {
      log('renderswtich', qType);
      switch (qType) {
          case 'subjective':
            return (
                <div className="subjective-render">
                    <hr className="rounded" color="grey" />
                    <div className="question-marks">
                        <div className="marks-text flex flex-row basis-1/2">
                            <div className="pt-8 pr-4">
                                Marks:
                            </div>
                            <TextField
                              id="question-marks"
                              placeholder="0"
                              setVal={setMarks}
                              val={marks}
                            />
                        </div>
                    </div>
                    <div className="checkers-notes pt-5">
                        <span className="text-grey pl-4">Checker&apos;s Notes</span>
                        <MarkdownTextField
                          id="checkers-notes"
                          val={checkerNotes || ''}
                          placeholder="Enter checker's notes here"
                          setVal={setCheckersNotes}
                        />
                    </div>
                </div>
              );
          default:
            return (
                <div className="mcq-render">
                    <div className="mcq-options ml-5">
                        <RadioGroup
                          choices={mcqChoice}
                          editable
                          setMcqCount={setMcqCount}
                          mcqCount={mcqCount}
                        />
                        <div className="w-1/6 pb-6 pt-5">
                            { mcqCount < 4 ? <SecondaryCTA text="+ Add Option" onClick={handleAddOption} /> : ''}
                        </div>
                    </div>
                    <hr className="rounded" color="grey" />
                    <div className="question-marks flex justify-between">
                        <div className="marks-text flex flex-row basis-1/2">
                            <div className="pt-8 pr-4">
                                Marks:
                            </div>
                            <TextField
                              id="question-marks"
                              placeholder="0"
                              setVal={setMarks}
                              val={marks}
                            />
                        </div>
                        {/* <div className="autocheck ml-5 pt-8 pr-4">
                            Autocheck
                            <Switch
                              className="pl-5"
                              onClick={toggleSwitch}
                              onChange={toggleSwitch}
                              checked={autoCheck}
                              offColor="#DADADA"
                              onColor="#604195"
                              uncheckedIcon={false}
                              checkedIcon={false}
                              height={15}
                              width={30}
                            />
                        </div> */}
                        <div className="mcq-ans pt-8 inline-flex">
                            Answer:
                            <Select
                              options={[
                            { value: 'JS', label: 'JS' },
                            { value: 'c++', label: 'C++' },
                            { value: 'html', label: 'HTML' }]}
                              className="m-5"
                            />
                            {/* <select
                          className="border-2 border-grey"
                        >
                            {choices.map((val) => (
                                <option key={val.quizioID}>
                                    {val.choice}
                                </option>
))}
                        </select> */}
                        </div>
                    </div>
                </div>
              );
        }
    };

    return (
        <div className="quiz-details w-full">
            <div className="quiz-details-title">{currentSection ? `${currentSection.title}` : ''}</div>
            <div className="quiz-question w-full">
                {/* TODO: add question number */}
                <div className="question-type-dropdown flex w-full justify-between">
                    <div className="question-title mt-6 mb-6 contentEditable">Question 1</div>
                    {/* <select className="order-last">
                        <option key="subjective">Subjective</option>
                        <option key="mcq">Multiple Choice</option>
                    </select> */}
                    <Select options={questionTypeOptions} onChange={handleQuestionType} defaultValue="mcq" className="text-sm p-5 w-200" />
                </div>
                <MarkdownTextField
                  id="question-description"
                  val={questionText}
                  placeholder="Enter question here"
                  setVal={setQuestionText}
                />
                {renderSwitch(questionType)}
                <div className="w-40 ml-auto mt-8">
                    {isUpdateLoading ? 'Saving...' : <PrimaryCTA text="Save Changes" onClick={handleSave} />}
                </div>
            </div>
        </div>
   );
};

export default Question;
