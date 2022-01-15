import React from 'react';
import { PropTypes } from 'prop-types';
import CheckMark from '@icons/check.svg';

const getBubbleClassName = (type) => {
    switch (type) {
        case 'not-visited':
            return 'border-purple text-purple';

        case 'marked': case 'marked-answered':
            return 'border-yellow-Y9 text-white bg-yellow-Y9 bg-opacity-60';

        case 'answered':
            return 'border-green-1 text-white bg-green-1 bg-opacity-60';

        default:
            return '';
    }
};

const QuestionBubble = ({ type, number }) => (
    <div className={`w-8 h-8 rounded-full border flex justify-center items-center relative ${getBubbleClassName(type)}`}>
        <span className="font-semibold text-sm">
            {number}
        </span>
        {type === 'marked-answered' && <img src={CheckMark} alt="" className="absolute -bottom-1 -right-1" />}
    </div>
    );

QuestionBubble.propTypes = {
    type: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
};

export default QuestionBubble;
