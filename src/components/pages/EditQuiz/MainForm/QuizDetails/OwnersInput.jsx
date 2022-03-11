import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import TextField from '@components/Input/TextField';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import { checkIfEmailExists } from '@api/users/usersFetcher';
import log from '@utils/log';
import '@pagestyles/create_quiz/quiz_details.scss';

const OwnersInput = ({
 ownersEmail, setOwnersEmail, owners, setOwners,
}) => {
  const [owner, setOwnerEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRemoveOwner = (i) => {
    const newOwnersEmail = [...ownersEmail];
    newOwnersEmail.splice(i, 1);
    setOwnersEmail(newOwnersEmail);
  };

  const handleAddOwner = async (e) => {
    const newOwnersEmail = [...ownersEmail];
    newOwnersEmail.push(owner);

    const newOwners = [...owners];
    /* adds a new owner after the spacebar(32), enter(13) or comma(188) is pressed */
    if (e.keyCode === 32 || e.keyCode === 13 || e.keyCode === 188) {
      if (ownersEmail.find((o) => o === owner)) {
        setEmailError('Already an owner!');
      } else {
        const isEmailValid = await checkIfEmailExists(owner);
        log({ isEmailValid });
        if (isEmailValid.success) {
          setOwnerEmail('');
          setOwnersEmail([...newOwnersEmail]);

          newOwners.push(isEmailValid.data.quizioID);
          setOwners([...newOwners]);
        } else {
          setEmailError('Email not found!');
        }
      }
    }
  };
  return (
      <div className="quiz-details-owners">
          <TextField
            id="Owners"
            placeholder="Add ownersEmail"
            label="Owners"
            error={emailError}
            helperText="Invalid email"
            val={owner}
            setVal={setOwnerEmail}
            onKeyDown={handleAddOwner}
          />
          <div className="quiz-details-owners-list">
              {ownersEmail.map((currOwner, i) => (
                  <div key={currOwner} className="quiz-details-owner">
                      <div className="quiz-details-owner-title">{currOwner}</div>
                      <button
                        type="button"
                        onClick={() => handleRemoveOwner(i)}
                        className="quiz-details-owner-remove"
                      >
                          <CrossIcon />
                      </button>
                  </div>
        ))}
          </div>
      </div>
  );
};

OwnersInput.propTypes = {
  ownersEmail: PropTypes.arrayOf(string),
  setOwnersEmail: PropTypes.func,
  owners: PropTypes.arrayOf(string),
  setOwners: PropTypes.func,
};

OwnersInput.defaultProps = {
  ownersEmail: [],
  setOwnersEmail: () => {},
  owners: [],
  setOwners: () => {},
};

export default OwnersInput;
