import React, { useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/create_quiz/registration_form.scss';

const RegistrationForm = () => {
	const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
	const [emailID, setEmailID] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [accessCode, setAccessCode] = useState('');
	return (
    <div className="registration-form">
        <div className="registration-form-title">Registration Form</div>
        <div className="registration-form-basic-details">
            <div className="registration-form-name">
                <div className="registration-form-first-name">
                    <TextField
                      id="First name"
                      placeholder="Candidate&#39;s name"
                      label="First Name"
                      error=""
                      val={firstName}
                      setVal={setFirstName}
                    />
                </div>
                <div className="registration-form-last-name">
                    <TextField
                      id="Last name"
                      placeholder="Candidate&#39;s name"
                      label="Last Name"
                      error=""
                      val={lastName}
                      setVal={setLastName}
                    />
                </div>
            </div>
            <div className="registration-form-contact">
                <div className="registration-form-contact-email">
                    <TextField
                      id="Email"
                      placeholder="Candidate&#39;s Email ID"
                      label="Email"
                      error=""
                      val={emailID}
                      setVal={setEmailID}
                    />
                </div>
                <div className="registration-form-contact-contactno">
                    <TextField
                      id="Contact No."
                      placeholder="Candidate&#39;s contact number"
                      label="Contact No."
                      error=""
                      val={contactNo}
                      setVal={setContactNo}
                    />
                </div>
            </div>
            <div className="registration-form-organisation-name">
                <TextField
                  id="Organisation Name"
                  placeholder="Candidate&#39;s Organisation name"
                  label="Organisation Name"
                  error=""
                  val={organisationName}
                  setVal={setOrganisationName}
                />
            </div>
            <div className="registration-form-access-code">
                <TextField
                  id="Access Code"
                  placeholder="Enter the quiz access code Eg: F4CSeb"
                  label="Access Code"
                  error=""
                  val={accessCode}
                  setVal={setAccessCode}
                />
            </div>
        </div>
    </div>
	);
};

export default RegistrationForm;
