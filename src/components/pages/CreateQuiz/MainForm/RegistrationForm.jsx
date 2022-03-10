import React, { useState } from 'react';
// useEffect,
import TextField from '@components/Input/TextField';
import '@pagestyles/create_quiz/registration_form.scss';
import SecondaryCTA from '@components/Buttons/SecondaryCTA';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { REGEX } from '@constants/constants';
import useCreateQuizStore from '@store/zustand/createQuiz';
import { useUpdateQuiz } from '@api/quizzes/useQuizzes';
import RegistrationFormCustomInput from '../RegistrationFormCustomInput';
import log from '@utils/log';
import RegistrationFormCustomInput from './RegistrationFormCustomInput';

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
  const { setCurrentStage } = useCreateQuizStore();
  // let nextPage = false;
  const { isSuccess: isCreateSucess, mutate: mutateQuizDetails } = useUpdateQuiz();
  const handleSave = () => {
    const reqBod = {};
    reqBod[fieldName1] = fieldLabel1;
    reqBod[fieldName2] = fieldLabel2;
    reqBod[fieldName3] = fieldLabel3;
    console.log(reqBod);
    const res = mutateQuizDetails(reqBod);
    console.log(res);
  };
  const handleSubmit = () => {
    console.log('before');
    handleSave();
    console.log(isCreateSucess); /* TODO: Fix mutation issue with backend */
    if (true) {
      console.log('in');
      setCurrentStage('Questions');
    }
  };

  // useEffect(() => {
  //   if (nextPage) {
  //   }
  // }, [nextPage]);

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
                      additionalClassName="bg-grey-N2"
                      disabled
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
                      additionalClassName="bg-grey-N2"
                      disabled
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
                      additionalClassName="bg-grey-N2"
                      disabled
                      pattern={REGEX.email}
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
                      additionalClassName="bg-grey-N2"
                      disabled
                      pattern={REGEX.contact}
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
                  additionalClassName="bg-grey-N2"
                  disabled
                />
            </div>
        </div>
        <div className="registration-form-additional-details-title">Additional Details</div>
        <div className="registration-form-additional-details">
            <RegistrationFormCustomInput
              id={1}
              fieldName={fieldName1}
              setFieldName={setFieldName1}
              fieldLabel={fieldLabel1}
              setFieldLabel={setFieldLabel1}
              required={required1}
              setRequired={setRequired1}
            />
            <RegistrationFormCustomInput
              id={2}
              fieldName={fieldName2}
              setFieldName={setFieldName2}
              fieldLabel={fieldLabel2}
              setFieldLabel={setFieldLabel2}
              required={required2}
              setRequired={setRequired2}
            />
            <RegistrationFormCustomInput
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
                <SecondaryCTA text="Save Details" onClick={handleSave} />
            </div>
            <div>
                <PrimaryCTA text="Start Adding Questions" onClick={handleSubmit} />
            </div>
        </div>
    </div>
	);
};

export default RegistrationForm;
