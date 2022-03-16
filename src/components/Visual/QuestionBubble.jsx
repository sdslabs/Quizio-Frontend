import React from 'react';
import { PropTypes } from 'prop-types';
import CheckMark from '@icons/check.svg';
import CheckMarkYellow from '@icons/checkYellow.svg';

const getBubbleClassName = (type) => {
  switch (type) {
    case 'not-visited':
      return 'question-bubble-not-visited';

    case 'marked':
    case 'marked-answered':
      return 'question-bubble-marked';

    case 'answered':
      return 'question-bubble-answered';

    case 'autochecked':
      return 'question-bubble-answered';

    case 'active':
      return 'question-bubble-active';

    case 'unattempted':
      return 'question-bubble-not-visited';

    case 'visited-unchecked':
      return 'question-bubble-marked';

    case 'checked':
      return 'question-bubble-answered';

    default:
      return '';
  }
};

const QuestionBubble = ({ type, number }) => (
    <div
      className={`w-8 h-8 rounded-full border flex justify-center items-center relative ${getBubbleClassName(
      type,
    )}`}
    >
        <span className="font-semibold text-sm">{number}</span>
        {type === 'marked-answered' && (
        <img src={CheckMark} alt="" className="absolute -bottom-1 -right-1" />
    )}
        {type === 'autochecked' && (
        <img
          src={CheckMarkYellow}
          alt=""
          className="absolute -bottom-1 -right-1"
        />
    )}
    </div>
);

QuestionBubble.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default QuestionBubble;
