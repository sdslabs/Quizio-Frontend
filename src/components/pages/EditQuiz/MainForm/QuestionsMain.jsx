import React, { useEffect, useState } from 'react';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import TextField from '@components/Input/TextField';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { useUpdateSection } from '@api/quizzes/useSections';
import _ from 'lodash';
import { useAddQuestion, useUpdateQuestion } from '@api/quizzes/useQuestions';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import RadioGroup from '@components/Input/RadioGroup';
import Switch from 'react-switch';

const Questions = () => {
    const { showQuestion } = useCreateQuizStore();

    if (showQuestion) return <Question />;
    return <SectionDescription />;
};

const Question = () => {
    const {
        sections, questions, showQuestion, activeSectionIndex, activeQuestion,
       } = useCreateQuizStore();

       const choices = [
        {
          choice: 'JS',
          quizioID: '1',
        },
        {
          choice: 'C++',
          quizioID: '2',
        },
      ];

    const [selected, setSelected] = useState('');
    const [autoCheck, setAutoCheck] = useState(false);
    const [questionText, setQuestionText] = useState('');

    console.log('show question', showQuestion);
    console.log('show active question', activeQuestion);
    const currentSection = sections[activeSectionIndex];
    const currentQuestion = questions[activeQuestion];
    console.log('question: ', currentQuestion);

    // const setQuestion (value) => {};
    const { isLoading, mutate: mutateQuestion, isSuccess } = useUpdateQuestion();
    const isAddingQuestion = false;
    const handleSave = () => {
        mutateQuestion({ sectionId: currentQuestion.id, body: _.omit(currentSection, ['id', 'questions']) });
    };
    console.log(isSuccess);

    const toggleSwitch = () => { setAutoCheck(!autoCheck); };

    // const setAutoCheck = () => { console.log('autocheck'); };
    return (
        <div className="quiz-details">
            <div className="quiz-details-title">{currentSection ? `${currentSection.title}` : ''}</div>
            <div className="quiz-question">
                <div className="question-title mt-6 mb-6">Question 1</div>

                <MarkdownTextField
                  id="question-description"
                  val={questionText}
                  limit={1500}
                  placeholder="Enter question here"
                  setVal={setQuestionText}
                />
                <div className="mcq-options ml-5">
                    <RadioGroup
                      choices={choices}
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <div className="w-1/6 pb-6 pt-5">
                        <SecondaryCTA text="+ Add Option" />
                    </div>
                </div>
                <hr className="rounded" color="grey" />
                <div className="question-marks inline-flex">
                    <div className="pt-10 pr-4">
                        Marks:
                    </div>
                    <div>
                        <TextField
                          id="question-marks"
                          placeholder="0"
                          // setVal={}
                          // val={currentQuestion.marks}
                        />
                    </div>
                    <div className="autocheck ml-5 pt-10 pr-4">
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
                    </div>
                    <div className="mcq-ans">
                        Answer:
                        <select
                          className="border-2 border-grey"
                        >
                            {choices.map((val) => (
                                <option key={val.quizioID}>
                                    {val.choice}
                                </option>
))}
                        </select>
                    </div>
                </div>
                <div className="w-40 ml-auto mt-8">
                    {isLoading || isAddingQuestion ? 'Saving...' : <PrimaryCTA text="Save Changes" onClick={handleSave} />}
                </div>
            </div>
        </div>
   );
};

const SectionDescription = () => {
    const {
 sections, activeSectionIndex, updateSection, addQuestionToSection, addQuestion, toggleQuestionForm,
} = useCreateQuizStore();
    const currentSection = sections[activeSectionIndex];
    console.log(activeSectionIndex);
    const setSectionTitle = (value) => updateSection({ ...currentSection, title: value });
    const setSectionDescription = (value) => updateSection({ ...currentSection, description: value });

    const { isLoading, mutate: mutateSection, isSuccess } = useUpdateSection();

    const {
 isLoading: isAddingQuestion, data: questionData, mutate: mutateQuestions, isSuccess: isQuestionAdded,
} = useAddQuestion();

    const handleSave = () => {
        mutateSection({ sectionId: currentSection.id, body: _.omit(currentSection, ['id', 'questions']) });
    };

    useEffect(() => {
        if (isSuccess) {
            if (currentSection.questions.length === 0) {
                mutateQuestions({ sectionId: currentSection.id });
            } else toggleQuestionForm(true);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isQuestionAdded) {
            const question = questionData.data?.data?.question;
            if (question) {
                addQuestionToSection(question.quizioID);
                addQuestion(question);
                toggleQuestionForm(true);
            }
        }
    }, [isQuestionAdded]);

    return (
        <div className="quiz-details">
            <div className="quiz-details-title">{currentSection ? 'Section Description' : 'Add New Section To Begin'}</div>
            {currentSection && (
            <div className="quiz-details-name">
                <TextField
                  label="Section Name"
                  limit={10}
                  val={currentSection.title}
                  setVal={setSectionTitle}
                  placeholder="Enter Section Name"
                  id="section-name"
                />
                <p className="text-sm text-grey-N6 mt-6 mb-2">
                    Section Instructions
                </p>
                <MarkdownTextField
                  id="section-description"
                  val={currentSection.description}
                  limit={1500}
                  placeholder="Enter instructions for this section"
                  setVal={setSectionDescription}
                />
                <div className="w-40 ml-auto mt-8">
                    {isLoading || isAddingQuestion ? 'Saving...' : <PrimaryCTA text="Save & Continue" onClick={handleSave} />}
                </div>
            </div>
)}
        </div>
    );
};

export default Questions;
