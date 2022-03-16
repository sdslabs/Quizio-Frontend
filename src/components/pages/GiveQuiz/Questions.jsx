/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
// import UserQuizRegistration from '@pages/Register/UserQuizRegistration';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useGetScore, useUpdateScore } from '@api/quizzes/useScore';
import { PropTypes } from 'prop-types';
import RadioButton from '@components/Input/RadioGroup/RadioButton';
import TextField from '@components/Input/TextField';
import useCheckQuizStore from '@redux/store/zustand/checkQuiz';
import { useGetQuestion } from '@api/quizzes/useQuestions';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useGetResponse, useUpdateResponse } from '@api/quizzes/useResponse';
import { useSelector } from 'react-redux';

const mapQuizData = (data) => data?.data?.data?.quiz || {};

const QuestionsWrapper = () => {
    const { quizID } = useParams();

    const { data, isSuccess } = useGetQuiz(quizID);
    // const [showModal, setShowModal] = useState(false);

    const { setQuiz, currentQuestion, currentSection } = useGiveQuizStore();

    useEffect(() => {
        if (isSuccess) {
            const { name, description, sections } = mapQuizData(data);
            setQuiz({
                name, description, sections, quizioID: quizID,
            });
        }
    }, [isSuccess]);

    const handleChange = (e) => {
        // setSelected(e.target.value);
      };

    // if (isLoading) return <div>Loading...</div>;

    // const { description, instruction } = mapQuizData(data);

    if (!currentQuestion) {
        return (
            <>
                <h1 className="text-3xl font-bold">Select a question to start checking.</h1>
            </>
        );
    }
    return (
        <>
            <h1 className="text-3xl font-bold">{currentSection}</h1>
            <Question />
        </>
    );
};

const Question = () => {
    const {
        currentQuestion, currentQuestionIndex, addAnsweredQuestion,
       } = useGiveQuizStore();
    const { participantID } = useParams();
    const [questionData, setQuestionData] = useState({});
    const [choice, setChoice] = useState(null);
    const [answer, setAnswer] = useState('');
    const {
        data,
        isLoading,
        isSuccess,
    } = useGetQuestion(currentQuestion);
    // console.log(currentQuestion);
    const userID = useSelector((state) => state.auth.user.userID);

    const {
        mutate: updateResponse, isLoading: responseLoading, isSuccess: responseSucess,
    } = useUpdateResponse();

    const { data: responseData, isSuccess: getResponseSuccess, isLoading: getResponseLoading } = useGetResponse(userID, currentQuestion);
    console.log(userID, 'userID');
    console.log(currentQuestion, 'questionID');
    useEffect(() => {
        if (responseSucess) {
            console.log('successful');
        }
    }, [responseSucess]);

    useEffect(() => {
        if (getResponseSuccess) {
            if (responseData.data.answerChoice) {
                console.log(responseData.data.data.answerChoice[0]);
                setChoice(responseData.data.data.answerChoice[0]);
}
            setAnswer(responseData.data.data.answer);
        }
    }, [getResponseSuccess]);

    const saveAndNext = () => {
        switch (questionData.type) {
            case 'mcq':
                updateResponse({ body: { questionID: currentQuestion, answerChoice: [choice] } });
            break;
            case 'subjective':
                updateResponse({ body: { questionID: currentQuestion, answer } });
                break;
            default:
                updateResponse({ body: { questionID: currentQuestion, answerChoice: [choice] } });
            break;
        }
        addAnsweredQuestion(currentQuestion);
        // console.log({ answer });
    };

    useEffect(() => {
        if (isSuccess) {
            // console.log(data);
            setQuestionData(data.data.data.question);
        }
    }, [isSuccess, isLoading, data]);

    const handleClear = () => {
        setAnswer('');
        setChoice(null);
    };

    if (isLoading) {
        return <>Loading...</>;
    }
    return (
        <div>
            <div className="flex flex-row justify-between items-center py-4">
                <p className="text-black-N6 font-semibold">
                    Question
                    {' '}
                    {currentQuestionIndex}
                </p>
                <p className="text-purple-V6 font-semibold">
                    Marks :
                    {' '}
                    {questionData.maxMarks ? questionData.maxMarks : 0}
                </p>
            </div>
            { (questionData.type === 'mcq')
            ? <MCQ questionText={questionData.question} options={questionData.choices} selected={choice} setChoice={setChoice} />
            : <Descriptive questionText={questionData.question} answer={answer} setAnswer={setAnswer} />}

            <div className="flex flex-row justify-end mt-8">
                <span className="w-100 text-purple cursor-pointer" onClick={handleClear} role="button">Clear Responses</span>
            </div>

            <div className="flex flex-row justify-end mt-8">
                <span className="w-100"><PrimaryCTA text="Save and next" onClick={saveAndNext} /></span>
            </div>
        </div>
    );
};

const MCQ = ({
 questionText, options, selected, setChoice,
}) => (
    <div>
        <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
        {options.map((choice, index) => (
            <div key={choice.quizioID}>
                <RadioButton
                  text={choice.choice}
                  onChange={(e) => { setChoice(e.target.value); }}
                  checked={selected === choice.quizioID}
                  quizioID={choice.quizioID}
                />
            </div>
      ))}
    </div>
);

MCQ.propTypes = {
    questionText: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.string || PropTypes.null,
    setChoice: PropTypes.func.isRequired,
};

const Descriptive = ({ questionText, answer, setAnswer }) => (
    <div>
        <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
        <TextField
          id="DescriptiveAnswer"
          placeholder=""
          val={answer}
          setVal={setAnswer}
        />
    </div>
);

Descriptive.propTypes = {
    questionText: PropTypes.string,
    answer: PropTypes.string.isRequired,
    setAnswer: PropTypes.func.isRequired,
};

Descriptive.defaultProps = {
    questionText: '',
};

export default QuestionsWrapper;
