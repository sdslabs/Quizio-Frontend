import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as QuestionsIcon } from '@icons/CreateQuiz/SideNavIcons/questions.svg';
import { ReactComponent as QuestionsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/questionsSelected.svg';
import { ReactComponent as PlusIcon } from '@icons/plusIcon.svg';
import { ReactComponent as DropdownArrowDownIcon } from '@icons/dropdownArrowDown.svg';
import { ReactComponent as DropdownArrowUpIcon } from '@icons/dropdownArrowUp.svg';
import { setCreateQuizStage } from '@redux/actions/quiz';
import QuestionBubble from '@pages/GiveQuiz/QuestionBubble';

const sectionsArr = [
  // {
  //     label: 'Section 1',
  //     count: 1,
  //     questions: [],
  // },

];
const SideNavQuestions = ({ selected }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  //  const [section, setSection] = useState(0);
  const [sections, setSections] = useState(sectionsArr);
  const [clicked, setClicked] = useState(false);
  //  const [addSection, setAddSection] = useState(false);
  // const [questionNo, setQuestionNo] = useState([]);

  const addNewSection = () => {
    // setAddSection(!addSection);
    const newSection = {
      label: `Section ${sections.length + 1}`,
      count: sections.length + 1,
      questions: [],
    };
    setSections([...sections, newSection]);
  };
  const addNewQuestion = (count) => {
    const newSection = [...sections];
    const questionNumber = newSection[count - 1].questions.length + 1;
    newSection[count - 1].questions.push(questionNumber);
    console.log({ newSection });
    setSections(newSection);
  };
  useEffect(() => {
    setActive(selected === 'Questions');
  }, [selected]);
  return (
      <div className="flex flex-col">

          <button
            type="button"
            onClick={() => {
          setClicked(!clicked);
          dispatch(setCreateQuizStage('Questions'));
        }}
            className={
          selected === 'Questions'
            ? 'create-quiz-sidenav-option-selected '
            : 'create-quiz-sidenav-option '
        }
          >
              <div className="create-quiz-sidenav-option-icon">
                  {selected === 'Questions' ? <QuestionsSelectedIcon /> : <QuestionsIcon />}
              </div>
              <div className={
          selected === 'Questions'
            ? 'create-quiz-sidenav-option-text-selected'
            : 'create-quiz-sidenav-option-text'
        }
              >
                  Questions

              </div>
              <div className="dropdown">
                  {active ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
              </div>
          </button>
          {clicked && (
          <div>
              {' '}

              {active && sections.map(({ label, count, questions }) => (
                  <>
                      <p
                        className={`side-nav-item${activeNav === label ? '-active' : ''} flex justify-between`}
                        onClick={() => setActiveNav(label)}
                      >
                          {label}
                          <DropdownArrowDownIcon />
                      </p>
                      {activeNav
                && (
                <div>
                    <div className={`side-nav-questions${activeNav === label ? '-active' : ''}`}>
                        {questions.map((question) => (
                            <QuestionBubble number={question} key={question} type="not-visited" />
                      ))}
                        <div>
                            <button
                              type="button"
                              onClick={() => { addNewQuestion(count); }}
                            >
                                <div className="create-quiz-sidenav-option-icon"><PlusIcon /></div>
                            </button>
                        </div>
                    </div>

                </div>
                )}
                  </>
          ))}
              <button
                type="button"
                className="create-quiz-sidenav-option flex-col"
                onClick={addNewSection}
              >

                  <div className="create-quiz-sidenav-option-text">
                      Add Section

                  </div>

              </button>
          </div>
      )}
      </div>

  );
};
SideNavQuestions.propTypes = {
  selected: PropTypes.string.isRequired,
};

export default SideNavQuestions;
