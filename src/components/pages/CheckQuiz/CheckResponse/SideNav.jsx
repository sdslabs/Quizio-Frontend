import React, { useEffect } from 'react';
import '@styles/pages/give_quiz/sidenav.scss';
import DropDownIcon from '@icons/dropdownArrowDown.svg';
import QuestionBubble from '@components/Visual/QuestionBubble';
import { useParams, useHistory } from 'react-router-dom';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useGetMultipleSections } from '@api/quizzes/useSections';
import { ReactComponent as ScrollIcon } from '@icons/scrollIcon.svg';

const SideNav = () => {
    const { quiz } = useGiveQuizStore();
    const history = useHistory;
    const { sectionID } = useParams();

    return (
        <div className="w-80 bg-grey-2 h-screen border-r border-grey-N4 flex-shrink-0 overflow-auto fixed pb-36">
            <p className="primary-text pt-8 px-10">
                {quiz.name}
            </p>
            <div className="flex flex-row pt-8 pb-4 ">
                <p className="text-purple-V6 font-semibold text-xl pl-10 pr-2">
                    Sudanshu Patel
                </p>
                <ScrollIcon />
            </div>
            <div className="bg-purple-V1 mx-6">
                <div className="flex flex-row py-2 justify-between">
                    <p className="text-black text-xs px-2">
                        Total Ques :
                        {' '}
                        <span className="text-purple-V6">100</span>
                    </p>
                    <p className="text-black text-xs px-2">
                        Autochecked :
                        {' '}
                        <span className="text-purple-V6">40</span>
                    </p>
                </div>
                <div className="flex flex-row py-2 justify-between">
                    <p className="text-black text-xs px-2">
                        Manually checked :
                        {' '}
                        <span className="text-purple-V6">100</span>
                    </p>
                    <p className="text-black text-xs px-2">
                        Unchecked :
                        {' '}
                        <span className="text-purple-V6">40</span>
                    </p>
                </div>
            </div>
            <div className="mx-6 pt-4 pb-8 flex flex-row items-center justify-begin">
                <input type="checkbox" className="border-purple-V6 rounded" defaultChecked={false} onChange={() => {}} />
                <span className="text-black text-xs px-2">Show only unchecked questions</span>
            </div>
            <p
              className={`side-nav-item${!sectionID ? '-active' : ''}`}
              onClick={() => history.push(`/quiz/${quiz.quizioID}`)}
            >
                Instructions
            </p>
            <AllSections />
        </div>
    );
};

const mapSectionsData = (result) => result.map((data) => data?.data?.data?.data?.section);

const AllSections = () => {
    const {
        quiz, sections, setSections,
       } = useGiveQuizStore();

    const result = useGetMultipleSections(quiz?.sections || []);

    const isSuccess = result.every((data) => !data.isLoading);

    const { sectionId } = useParams();

    const history = useHistory();

    const handleSectionTabClick = (id) => {
        history.push(`/quiz/${quiz.quizioID}/${id}`);
    };

    useEffect(() => {
        if (isSuccess) {
            console.log('mapping');
            setSections(mapSectionsData(result) || []);
        }
    }, [isSuccess]);
    console.log(sections);
    return (
        <>
            {sections.map(({ title, questions, quizioID }) => (
                <>
                    <p
                      className={`side-nav-item${sectionId === quizioID ? '-active' : ''} flex justify-between`}
                      onClick={() => handleSectionTabClick(quizioID)}
                    >
                        {title}
                        <img src={DropDownIcon} alt="" className="side-nav-toggle" />
                    </p>
                    <div className={`side-nav-questions${sectionId === quizioID ? '-active' : ''}`}>
                        {questions.map((question, index) => (
                            <QuestionBubble number={index + 1} key={question} type="not-visited" />
                        ))}
                    </div>
                </>
            ))}
        </>
);
};

export default SideNav;
