import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';

const MarkdownTextField = ({
    id, label, placeholder, error, limit, val, setVal, onKeyDown,
}) => {
    const [navState, setNavState] = useState('write');

    return (
        <div className="markdown">
            <button
              type="button"
              onClick={() => {
                setNavState('write');
                }}
              className={navState === 'preview'
                  ? 'decoration-red-400'
                  : 'decoration-blue-400'}
            >
                Write
            </button>
            <button
              type="button"
              onClick={() => {
                    setNavState('preview');
                    }}
              className={navState === 'write'
                  ? 'decoration-red-400'
                  : 'decoration-blue-400'}
            >
                Preview
            </button>

            <TextField
              id={id}
              label={label}
              placeholder={placeholder}
              error={error}
              limit={limit}
              val={val}
              setVal={setVal}
              onKeyDown={onKeyDown}
            />
        </div>
    );
};

MarkdownTextField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    error: PropTypes.string,
    limit: PropTypes.number,
    val: PropTypes.string.isRequired,
    setVal: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
};

MarkdownTextField.defaultProps = {
    error: '',
    label: '',
    limit: 0,
    onKeyDown: () => {},
};

export default MarkdownTextField;
