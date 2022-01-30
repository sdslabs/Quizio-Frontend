import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as QuestionsIcon } from '@icons/CreateQuiz/SideNavIcons/questions.svg';
import { ReactComponent as QuestionsSelectedIcon } from '@icons/CreateQuiz/SideNavIcons/questionsSelected.svg';
import { ReactComponent as DropdownArrowDownIcon } from '@icons/dropdownArrowDown.svg';
import { ReactComponent as DropdownArrowUpIcon } from '@icons/dropdownArrowUp.svg';
import { setCreateQuizStage } from '@redux/actions/quiz';
import QuestionBubble from '@pages/GiveQuiz/QuestionBubble';
import PlusIcon from '@icons/plusIcon.svg';

const sectionsArr = [];
const SideNavQuestions = ({ selected }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [sections, setSections] = useState(sectionsArr);
  const [clicked, setClicked] = useState(false);

  const addNewSection = () => {
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
                            <img src={PlusIcon} alt="" onClick={() => addNewQuestion(count)} />
                        </div>
                    </div>

                </div>
                )}
                  </>
          ))}
              <div className="p-4">
                  <button
                    type="button"
                    className="side-nav-item-active w-full "
                    onClick={addNewSection}
                  >
                      + Add Section
                  </button>
              </div>
          </div>
      )}
      </div>

  );
};
SideNavQuestions.propTypes = {
  selected: PropTypes.string.isRequired,
};

export default SideNavQuestions;
