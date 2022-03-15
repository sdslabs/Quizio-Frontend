import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
// import UserQuizRegistration from '@pages/Register/UserQuizRegistration';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { PropTypes } from 'prop-types';
import RadioButton from '@components/Input/RadioGroup/RadioButton';
import TextField from '@components/Input/TextField';
import useCheckQuizStore from '@redux/store/zustand/checkQuiz';

const placeHolderText = 'The smallest division on the main scale of a Vernier calipers is 0.1 cm. Ten';

const mapQuizData = (data) => data?.data?.data?.quiz || {};

const QuestionsWrapper = () => {
    const { quizID } = useParams();

    const { data, isSuccess } = useGetQuiz(quizID);
    // const [showModal, setShowModal] = useState(false);

    const { setQuiz, currentQuestion } = useCheckQuizStore();

    useEffect(() => {
        if (isSuccess) {
            const { name, description, sections } = mapQuizData(data);
            setQuiz({
                name, description, sections, quizioID: quizID,
            });
        }
    }, [isSuccess]);

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
            <h1 className="text-3xl font-bold">Section 1</h1>
            <Question />
        </>
    );
};

const Question = () => {
    const {
        currentQuestion,
       } = useCheckQuizStore();
    const options = ['JS', 'C++', 'HTML', 'c'];
    const checked = false;
    const [marks, setMarks] = useState(0);
    const [notes, setNotes] = useState('');
    const saveAndNext = () => {
        console.log('marks are : ', marks);
        console.log('notes are : ', notes);
    };
    return (
        <div>
            <div className="flex flex-row justify-between items-center py-4">
                <p className="text-black-N6 font-semibold">
                    {currentQuestion}
                </p>
                {checked
                ? <div className="text-green-1 font-semibold bg-green-1 bg-opacity-25 p-1">Checked : 1/4</div>
                : <div className="text-yellow-Y9 font-semibold bg-yellow-Y9 bg-opacity-25 p-1">Unchecked</div>}
            </div>
            <MCQ questionText={placeHolderText} options={options} selected={0} />
            <Descriptive questionText={placeHolderText} answer={placeHolderText} />
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center">
                    <p className="align-middle mr-2">Marks(out of 4)</p>
                    <span>
                        <TextField
                          id="marks"
                          placeholder="0"
                          limit={2}
                          val={marks}
                          setVal={setMarks}
                          additionalClassName="h-10 w-10"
                        />
                    </span>
                    {marks === 0 && <p className="align-middle px-2 text-purple-V6 cursor-pointer">Clear marks</p>}
                </div>
                <div className="flex flex-row items-center">
                    Checked by :
                    {' '}
                    <span className="text-purple-V6 cursor-pointer">Siddhu</span>
                </div>
            </div>
            <div className="flex flex-row justify-end">
                <span className="w-100"><PrimaryCTA text="Save and next" onClick={saveAndNext} /></span>
            </div>
            <p className="text-grey-N6">
                Checkers notes
            </p>
            <TextField
              id="notes"
              placeholder="Write notes"
              val={notes}
              setVal={setNotes}
            />
        </div>
    );
};

const MCQ = ({ questionText, options, selected }) => (
    <div>
        <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
        {options.map((choice, index) => (
            <div key={choice.quizioID}>
                <RadioButton
                  text={choice}
                  onChange={() => {}}
                  checked={selected === index}
                  quizioID={choice.quizioID}
                />
            </div>
      ))}
    </div>
);

MCQ.propTypes = {
    questionText: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.number.isRequired,
};

const Descriptive = ({ questionText, answer }) => (
    <div>
        <div className="bg-purple-V1 p-2 my-2">{questionText}</div>
        <TextField
          id="DescriptiveAnswer"
          placeholder=""
          val={answer}
          setVal={() => {}}
        />
    </div>
);

Descriptive.propTypes = {
    questionText: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

export default QuestionsWrapper;
