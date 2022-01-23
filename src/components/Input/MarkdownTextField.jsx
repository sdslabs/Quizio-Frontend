import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const MarkdownTextField = ({
 id, placeholder, error, limit, val, setVal, onKeyDown,
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

  return (
      <div className="markdown">
          <button
            type="button"
            onClick={() => setNavState('write')}
            className={navState === 'write'
                ? 'px-4 py-0 border-b-2 border-purple-V6 text-purple-V6'
                : 'px-4 py-0 border-b-2 border-grey-N6 text-grey-N6'}
          >
              Write
          </button>
          <button
            type="button"
            onClick={() => setNavState('preview')}
            className={navState === 'preview'
                ? 'px-4 py-0 border-purple-600 border-b-2 text-purple-600'
                : 'px-4 py-0 border-b-2 border-grey-N6 text-grey-N6'}
          >
              Preview
          </button>

          <>
              {navState === 'write' ? (
                  <div className="relative pt-2 w-full">
                      <textarea
                        value={val}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        id={id}
                        className={`h-32 resize-none mt-1 p-4 border border-${error ? 'red-error' : 'grey-N4'} rounded
                    w-full text-sm placeholder-grey-N4::placeholder
                    focus:outline-none focus:border-purple`}
                      />
                      {error && <span className="text-sm text-red-error absolute right-0 top-0">{error}</span>}
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
                <div className="h-32 overflow-auto border border-grey-N4 rounded text-sm">
                    {/* eslint-disable-next-line */}
                    <ReactMarkdown children={val} />
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
