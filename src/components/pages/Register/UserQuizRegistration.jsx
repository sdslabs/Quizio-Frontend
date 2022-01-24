import React, { useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/user_quiz_registration.scss';
import { REGEX } from '@constants/constants';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';

const UserQuizRegistration = () => {
	const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
	const [emailID, setEmailID] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [fieldInput1, setfieldInput1] = useState('');
  const [fieldInput2, setfieldInput2] = useState('');
  const [fieldInput3, setfieldInput3] = useState('');

	return (
    <div className="user-quiz-registration">
        <div className="user-quiz-registration-title">Registration Form</div>
        <div className="user-quiz-registration-basic-details">
            <div className="user-quiz-registration-name">
                <div className="user-quiz-registration-first-name">
                    <TextField
                      id="First name"
                      placeholder="Candidate&#39;s name"
                      label="First Name"
                      error=""
                      val={firstName}
                      setVal={setFirstName}
                      disabled
                    />
                </div>
                <div className="user-quiz-registration-last-name">
                    <TextField
                      id="Last name"
                      placeholder="Candidate&#39;s name"
                      label="Last Name"
                      error=""
                      val={lastName}
                      setVal={setLastName}
                      disabled
                    />
                </div>
            </div>
            <div className="user-quiz-registration-contact">
                <div className="user-quiz-registration-contact-email">
                    <TextField
                      id="Email"
                      placeholder="Candidate&#39;s Email ID"
                      label="Email"
                      error=""
                      val={emailID}
                      setVal={setEmailID}
                      disabled
                      pattern={REGEX.email}
                    />
                </div>
                <div className="user-quiz-registration-contact-contactno">
                    <TextField
                      id="Contact No."
                      placeholder="Candidate&#39;s contact number"
                      label="Contact No."
                      error=""
                      val={contactNo}
                      setVal={setContactNo}
                      disabled
                      pattern={REGEX.contact}
                    />
                </div>
            </div>
            <div className="user-quiz-registration-organisation-name">
                <TextField
                  id="Organisation Name"
                  placeholder="Candidate&#39;s Organisation name"
                  label="Organisation Name"
                  error=""
                  val={organisationName}
                  setVal={setOrganisationName}
                  disabled
                />
            </div>
        </div>
        <div className="user-quiz-registration-additional-details-title">Additional Details</div>
        <div className="user-quiz-registration-field-input">
            <TextField
              id="Field Name"
              placeholder="Field Label"
              label="Field Name"
              error=""
              val={fieldInput1}
              setVal={setfieldInput1}
            />
        </div>
        <div className="user-quiz-registration-field-input">
            <TextField
              id="Field Name"
              placeholder="Field Label"
              label="Field Name"
              error=""
              val={fieldInput2}
              setVal={setfieldInput2}
            />
        </div>
        <div className="user-quiz-registration-field-input">
            <TextField
              id="Field Name"
              placeholder="Field Label"
              label="Field Name"
              error=""
              val={fieldInput3}
              setVal={setfieldInput3}
            />
        </div>
        <div className="user-quiz-registration-register-container">
            <div>
                <PrimaryCTA text="Register" onClick={console.log('todo')} />
            </div>
        </div>
    </div>
	);
};

export default UserQuizRegistration;
