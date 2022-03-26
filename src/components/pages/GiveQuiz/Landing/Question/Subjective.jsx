/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import MarkdownTextField from '@components/Input/MarkdownTextField';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Subjective = ({ questionText, answer, setAnswer }) => (
    <div>
        {/* <div className="bg-purple-V1 p-2 my-2">{questionText}</div> */}
        <div className="bg-purple-V1 p-2 my-2">
            <ReactMarkdown
              children={questionText}
              remarkPlugins={[remarkGfm]}
              components={{
          code({
 node, inline, className, children, ...props
}) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
          },
        }}
            />
        </div>
        <MarkdownTextField
          id="DescriptiveAnswer"
          placeholder="Your answer here"
          val={answer || ''}
          setVal={setAnswer}
        />
    </div>
);

Subjective.propTypes = {
  questionText: PropTypes.string,
  answer: PropTypes.string,
  setAnswer: PropTypes.func.isRequired,
};

Subjective.defaultProps = {
  questionText: '',
  answer: '',
};

export default Subjective;
