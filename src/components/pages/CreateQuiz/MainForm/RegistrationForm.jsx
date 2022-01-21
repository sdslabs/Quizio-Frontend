import React, { useState } from 'react';
import TextField from '@components/Input/TextField';
import CustomField from '@components/Input/CustomField';
import '@pagestyles/create_quiz/registration_form.scss';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';

const RegistrationForm = () => {
	const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
	const [emailID, setEmailID] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [required1, setRequired1] = useState(false);
  const [required2, setRequired2] = useState(false);
  const [required3, setRequired3] = useState(false);
  const [fieldName1, setFieldName1] = useState('');
  const [fieldLabel1, setFieldLabel1] = useState('');
  const [fieldName2, setFieldName2] = useState('');
  const [fieldLabel2, setFieldLabel2] = useState('');
  const [fieldName3, setFieldName3] = useState('');
  const [fieldLabel3, setFieldLabel3] = useState('');

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
                      bgColor="grey-N2"
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
                      bgColor="grey-N2"
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
                      bgColor="grey-N2"
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
                      bgColor="grey-N2"
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
                  bgColor="grey-N2"
                />
            </div>
        </div>
        <div className="registration-form-additional-details-title">Additional Details</div>
        <div className="registration-form-additional-details">
            <CustomField
              id={1}
              fieldName={fieldName1}
              setFieldName={setFieldName1}
              fieldLabel={fieldLabel1}
              setFieldLabel={setFieldLabel1}
              required={required1}
              setRequired={setRequired1}
            />
            <CustomField
              id={2}
              fieldName={fieldName2}
              setFieldName={setFieldName2}
              fieldLabel={fieldLabel2}
              setFieldLabel={setFieldLabel2}
              required={required2}
              setRequired={setRequired2}
            />
            <CustomField
              id={3}
              fieldName={fieldName3}
              setFieldName={setFieldName3}
              fieldLabel={fieldLabel3}
              setFieldLabel={setFieldLabel3}
              required={required3}
              setRequired={setRequired3}
            />
        </div>
        <div className="registration-details-submit-container">
            <div className="registration-details-submit-save-details">
                <SecondaryCTA text="Save Details" onClick={console.log('todo')} />
            </div>
            <div>
                <PrimaryCTA text="Start Adding Questions" onClick={console.log('todo')} />
            </div>
        </div>
    </div>
	);
};

export default RegistrationForm;
