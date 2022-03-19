/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/user_quiz_registration.scss';
import { REGEX } from '@constants/constants';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { useRegisterParticipant } from '@api/register/useRegister';
import PropTypes from 'prop-types';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useSelector } from 'react-redux';
import { getQuizById } from '@api/quizzes/quizzesFetcher';
import { registerParticipant } from '@api/register/registrationFetcher';

const UserQuizRegistrationModal = ({
  quizID, detail1, detail2, detail3, setShowModal,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailID, setEmailID] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [detail1Value, setDetail1Value] = useState('');
  const [detail2Value, setDetail2Value] = useState('');
  const [detail3Value, setDetail3Value] = useState('');
  // const { mutate: mutateRegisterParticipant } = useRegisterParticipant;
  // const { isLoading, data, isSuccess } = useGetQuiz(quizID);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const userFirstName = useSelector((state) => state.auth.user?.firstName);
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const userContactNumber = useSelector((state) => state.auth.user?.phoneNumber);
  const userOrganization = useSelector((state) => state.auth.user?.instiName);

  useEffect(async () => {

  });
  const body = {
    quizID,
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    contactNo: userContactNumber,
    orgName: 'SDSLabs',
    detail1: {
        key: detail1.key,
        value: detail1Value,
    },
    detail2: {
      key: detail2.key,
      value: detail2Value,
    },
    detail3: {
      key: detail3.key,
      value: detail3Value,
  },
};
  const handleRegisterParticipant = () => {
    console.log('before');
    registerParticipant({ body });
    setShowModal(false);
    console.log('after');
  };

  // console.log
  return (
      <div className="user-quiz-registration">
          <>
              <div className="user-quiz-registration-title">Registration Form</div>
              <div className="registration-form-basic-details">
                  <div className="user-quiz-registration-name">
                      <div className={`user-quiz-registration-first-name ${userFirstName ? '' : 'hidden'}`}>
                          <TextField
                            id="First name"
                            placeholder={userFirstName}
                            label="First Name"
                            error=""
                            val={firstName}
                            setVal={setFirstName}
                            additionalClassName="bg-grey-N2"
                            disabled
                          />
                      </div>
                      <div className={`user-quiz-registration-last-name ${userLastName ? '' : 'hidden'}`}>
                          <TextField
                            id="Last name"
                            placeholder={userLastName}
                            label="Last Name"
                            error=""
                            val={lastName}
                            setVal={setLastName}
                            additionalClassName="bg-grey-N2"
                            disabled
                          />
                          {' '}

                      </div>
                  </div>
                  <div className={`user-quiz-registration-contact ${userEmail ? '' : 'hidden'}`}>
                      <div className="user-quiz-registration-contact-email">
                          <TextField
                            id="Email"
                            placeholder={userEmail}
                            label="Email"
                            error=""
                            val={emailID}
                            setVal={setEmailID}
                            additionalClassName="bg-grey-N2"
                            disabled
                            pattern={REGEX.email}
                          />
                      </div>
                      <div className={`user-quiz-registration-contact-contactno ${userContactNumber === null ? 'hidden' : ''}`}>
                          <TextField
                            id="Contact No."
                            placeholder={userContactNumber}
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
                  <div className="user-quiz-registration-organisation-name">
                      <TextField
                        id="Organisation Name"
                        placeholder={userOrganization}
                        label="Organisation Name"
                        error=""
                        val={organisationName}
                        setVal={setOrganisationName}
                        additionalClassName="bg-grey-N2"
                        disabled
                      />
                  </div>
              </div>
              <div className={`user-quiz-registration-additional-details-title ${detail1.key === undefined ? 'hidden' : ''}`}>Additional Details</div>
              <div className={`user-quiz-registration-field-input ${detail1.key === undefined ? 'hidden' : ''}`}>
                  <TextField
                    id="detail1"
                    placeholder={detail1.value}
                    label={detail1.key}
                    error=""
                    val={detail1Value}
                    setVal={setDetail1Value}
                  />
              </div>
              <div className={`user-quiz-registration-field-input ${detail2.key === undefined ? 'hidden' : ''}`}>
                  <TextField
                    id="detail2"
                    placeholder={detail2}
                    label="detail2"
                    error=""
                    val={detail2Value}
                    setVal={setDetail2Value}
                  />
              </div>
              <div className={`user-quiz-registration-field-input ${detail3.key === undefined ? 'hidden' : ''}`}>
                  <TextField
                    id="detail3"
                    placeholder={detail3.label}
                    label="detail3"
                    error=""
                    val={detail3Value}
                    setVal={setDetail3Value}
                  />
              </div>
              <div className="user-quiz-registration-register-container">
                  <div>
                      <PrimaryCTA text="Register" onClick={handleRegisterParticipant} />
                  </div>
              </div>
          </>
      </div>
  );
};
UserQuizRegistrationModal.propTypes = {
  quizID: PropTypes.string.isRequired,
  detail1: PropTypes.string,
  detail2: PropTypes.string,
  detail3: PropTypes.string,
  setShowModal: PropTypes.func.isRequired,

};
UserQuizRegistrationModal.defaultProps = {
  detail1: '',
  detail2: '',
  detail3: '',
};
export default UserQuizRegistrationModal;
