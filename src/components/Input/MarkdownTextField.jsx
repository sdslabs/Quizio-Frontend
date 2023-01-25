/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ReactComponent as DeleteButton } from '@icons/delete_button.svg';

const MarkdownTextField = ({
  id,
  placeholder,
  error,
  limit,
  val,
  setVal,
  onKeyDown,
  isQuestion,
}) => {
  const [navState, setNavState] = useState('write');
  const [currentLen, setCurrentLen] = useState(0);

  const handleChange = (e) => {
    const newVal = e.target.value;
    if (newVal.length <= limit - 1 || limit === 0) {
      setVal(newVal);
    }
    setCurrentLen(newVal.length);
  };

  // TODO: Add delete question functionality
  const handleDeleteQuestion = () => {
  };

  return (
      <div className="py-1">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
                <button
                  type="button"
                  onClick={() => setNavState('write')}
                  className={
                navState === 'write'
                  ? 'px-4 py-0 border-b-2 border-purple-V6 text-purple-V6'
                  : 'px-4 py-0 border-b-2 border-grey-N6 text-grey-N6'
              }
                >
                    Write
                </button>
                <button
                  type="button"
                  onClick={() => setNavState('preview')}
                  className={
                navState === 'preview'
                  ? 'px-4 py-0 border-purple-600 border-b-2 text-purple-600'
                  : 'px-4 py-0 border-b-2 border-grey-N6 text-grey-N6'
              }
                >
                    Preview
                </button>
          </div>

          {isQuestion && (
             <div>
                <button type='button' className='w-6 h-6 m-2' onClick={handleDeleteQuestion}>
                  <DeleteButton />
                </button>
             </div>
           )
          }
        </div>

          <>
              {navState === 'write' ? (
                  <div className="relative pt-2 w-full">
                      <textarea
                        value={val}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        id={id}
                        className={`h-32 resize-none mt-1 p-4 border border-${
                error ? 'red-error' : 'grey-N4'
              } rounded
                    w-full text-sm placeholder-grey-N4::placeholder
                    focus:outline-none focus:border-purple`}
                      />
                      {error && (
                      <span className="text-sm text-red-error absolute right-0 top-0">
                          {error}
                      </span>
            )}
                      {limit !== 0 && (
                      <div className="flex w-full justify-end text-sm text-grey-N6">
                          {currentLen}
                          /
                          {limit}
                      </div>
            )}
                  </div>
        ) : (
            <div className="relative pt-2 w-full">
                <div className="h-32 p-4 mt-1 overflow-auto border border-grey-N4 rounded text-sm">
                    <ReactMarkdown
                      children={val}
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
            </div>
        )}
          </>
      </div>
  );
};

MarkdownTextField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  limit: PropTypes.number,
  val: PropTypes.string.isRequired,
  setVal: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
};

MarkdownTextField.defaultProps = {
  error: '',
  limit: 0,
  onKeyDown: () => {},
};

export default MarkdownTextField;
