import React, { Fragment, useEffect } from 'react';
import DropDownIcon from '@icons/dropdownArrowDown.svg';
import QuestionBubble from '@components/Visual/QuestionBubble';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useParams, useHistory } from 'react-router-dom';
import { useGetMultipleSections } from '@api/quizzes/useSections';
import '@styles/pages/give_quiz/sidenav.scss';
import log from '@utils/log';

const AllSections = () => {
  const {
    quiz,
    sections,
    setSections,
    currentQuestion,
    answeredQuestions,
    markedAnsweredQuestions,
    markedQuestions,
    setCurrentQuestion,
    setCurrentSection,
    setCurrentQuestionIndex,
    setTotalQuestions,
  } = useGiveQuizStore();

  const result = useGetMultipleSections(quiz?.sections || []);

  const isSuccess = result.every((data) => !data.isLoading);

  const { sectionID } = useParams();

  const history = useHistory();

  const handleSectionTabClick = (id) => {
    setCurrentQuestion(null);
    history.push(`/quiz/attempt/${quiz.quizioID}/${id}`);
  };

  const handleBubbleClick = (questionID, title, questionIndex) => {
    setCurrentQuestion(questionID);
    setCurrentSection(title);
    setCurrentQuestionIndex(questionIndex);
  };

  const getQuestionBubbleType = (question) => {
    if (currentQuestion === question) {
      return 'active';
    }

    if (answeredQuestions.includes(question)) {
      return 'answered';
    }

    if (markedQuestions.includes(question)) {
      return 'marked';
    }

    if (markedAnsweredQuestions.includes(question)) {
      return 'marked-answered';
    }

    return 'not-visited';
  };

  useEffect(() => {
    if (isSuccess) {
      const sectionsData = result.map((data) => data?.data?.data?.data?.section) || [];
      log({ sectionsData });

      setSections(sectionsData);
      let totalQuestions = 0;
      sectionsData.forEach((section) => {
        totalQuestions += section?.questions?.length || 0;
      });
      setTotalQuestions(totalQuestions);
    }
  }, [isSuccess]);

  return (
      <>
          {sections.map(({ title, questions, quizioID }) => (
              <Fragment key={quizioID}>
                  <button
                    type="button"
                    className={`w-full text-left m-0 side-nav-item${
              sectionID === quizioID ? '-active' : ''
            } flex justify-between`}
                    onClick={() => handleSectionTabClick(quizioID)}
                  >
                      {title}
                      <img src={DropDownIcon} alt="" className="side-nav-toggle" />
                  </button>
                  <div
                    className={`side-nav-questions${
              sectionID === quizioID ? '-active' : ''
            }`}
                  >
                      {questions.map((question, quesIDx) => (
                          <button
                            onClick={() => {
                  handleBubbleClick(question, title, quesIDx + 1);
                }}
                            key={question || quesIDx}
                            type="button"
                          >
                              <QuestionBubble
                                number={quesIDx + 1}
                                type={getQuestionBubbleType(question)}
                              />
                          </button>
            ))}
                  </div>
              </Fragment>
      ))}
      </>
  );
};

export default AllSections;
