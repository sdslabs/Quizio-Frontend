import React, { useState } from 'react';
import '@styles/pages/give_quiz/sidenav.scss';
import DropDownIcon from '@icons/dropdownArrowDown.svg';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import QuestionBubble from './QuestionBubble';

const sections = [
    {
        label: 'Section 1',
        questions: new Array(18).fill(0).map((_, i) => i + 1),
    },
    {
        label: 'Section 2',
        questions: new Array(12).fill(0).map((_, i) => i + 1),
    },
    {
        label: 'Section 3',
        questions: new Array(100).fill(0).map((_, i) => i + 1),
    },
];

const SideNav = () => {
    const [activeNav, setActiveNav] = useState('');

    return (
        <div className="w-72 bg-grey-2 h-screen border-r border-grey-N4 flex-shrink-0 overflow-auto pb-28">
            <p className="primary-text py-8 px-10">
                Quiz Name
            </p>
            <p
              className={`side-nav-item${activeNav === 'instructions' ? '-active' : ''}`}
              onClick={() => setActiveNav('instructions')}
            >
                Instructions

            </p>
            {sections.map(({ label, questions }) => (
                <>
                    <p
                      className={`side-nav-item${activeNav === label ? '-active' : ''} flex justify-between`}
                      onClick={() => setActiveNav(label)}
                    >
                        {label}
                        <img src={DropDownIcon} alt="" className="side-nav-toggle" />
                    </p>
                    <div className={`side-nav-questions${activeNav === label ? '-active' : ''}`}>
                        {questions.map((question) => (
                            <QuestionBubble number={question} key={question} type="not-visited" />
                        ))}
                    </div>
                </>
            ))}
            <div className="fixed bottom-0 px-10 pt-1 pb-6 w-72 z-10 bg-white border-r border-grey-N4">
                <SecondaryCTA text="Submit Quiz" />
            </div>
        </div>
    );
};

export default SideNav;
