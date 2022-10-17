import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';
import { REGEX } from '@constants/constants';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import '@pagestyles/register/user_quiz_registration.scss';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';

const UserQuizRegistration = ({
  quizID,
  mutateRegisterParticipant,
  setShowModal,
}) => {
  // quiz data getter query
  const {
    data: quizData,
    isSuccess: quizDataSuccess,
    isFetching: isFetchingQuizData,
  } = useGetQuiz(quizID);

  // Local States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [orgName, setOrgName] = useState('');
  // details stand for additional details to be provided by the user
  const [detail1, setDetail1] = useState({});
  const [detail2, setDetail2] = useState({});
  const [detail3, setDetail3] = useState({});
  const [detail1Value, setDetail1Value] = useState('');
  const [detail2Value, setDetail2Value] = useState('');
  const [detail3Value, setDetail3Value] = useState('');
  const [contactNoError, setContactNoError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  // const [areDetailsFilled, setAreDetailsFilled] = useState(false);
  const [detail1Error, setDetail1Error] = useState(null);
  const [detail2Error, setDetail2Error] = useState(null);
  const [detail3Error, setDetail3Error] = useState(null);

  // Old data
  const userEmail = useSelector((state) => state.auth.user?.email);
  const userFirstName = useSelector((state) => state.auth.user?.firstName);
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const userPhoneNumber = useSelector((state) => state.auth.user?.phoneNumber);

  const handleDataValidation = () => {
    const contactNoFormat = /^\d{10}$/;
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/;
    // const gsuiteEmailFormat = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.iitr\.ac\.in*)/;
    // change this to allow gsuite ids

    if (!contactNo.match(contactNoFormat) || contactNo === '') {
      console.log('handle contact number');
      setContactNoError('Invalid contact number');
    } else {
      setContactNoError(null);
    }

    if (!email.match(emailFormat)) {
      console.log('handle email');
      setEmailError('Invalid email id');
    } else {
      setEmailError(null);
    }

    if (detail1Value === '' && detail1.isRequired) {
      setDetail1Error('This is a required field');
      console.log('detail1Error ', detail1Error);
    } else {
      setDetail1Error(null);
    }
    console.log(detail2, detail1);
    if (detail2Value === '' && detail2.isRequired) {
      setDetail2Error('This is a required field');
      console.log('detail2Error ', detail2Error);
    } else {
      setDetail2Error(null);
    }

    if (detail3Value === '' && detail3.isRequired) {
      setDetail3Error('This is a required field');
      console.log('detail3Error ', detail3Error);
    } else {
      setDetail3Error(null);
    }
    console.log(contactNoError, emailError, detail1Error, detail2Error, detail3Error);
    return ((contactNoError === null) && (emailError === null) && (detail1Error === null) && (detail2Error === null));
  };

  const handleRegisterParticipant = async () => {
    const isNoError = await handleDataValidation();
    const body = {
      quizID,
      accessCode: 'SDSLabs', // TODO: remove hardcoding after test
      firstName,
      lastName,
      email,
      contactNo,
      orgName,
      detail1: {
        key: detail1?.key,
        value: detail1Value,
      },
      detail2: {
        key: detail2?.key,
        value: detail2Value,
      },
      detail3: {
        key: detail3?.key,
        value: detail3Value,
      },
    };
    log({ isNoError });
    if (isNoError) {
      console.log('register');
      mutateRegisterParticipant({ body });
    }
  };

  useEffect(() => {
    log('QUIZ ID:', { quizID }, false);
  }, [quizID]);

  useEffect(() => {
    if (quizDataSuccess) {
      log({ quiz: quizData?.quiz });
      log({ detail1: quizData?.quiz?.detail1 });
      setDetail1(quizData?.quiz?.detail1 || false);
      setDetail2(quizData?.quiz?.detail2 || false);
      setDetail3(quizData?.quiz?.detail3 || false);
    }
  }, [quizDataSuccess, quizData]);

  useEffect(() => {
    setEmail(userEmail || '');
    setFirstName(userFirstName || '');
    setLastName(userLastName || '');
    setContactNo(userPhoneNumber || '');
  }, [userEmail, userFirstName, userLastName, userPhoneNumber]);

  return (
      <div className="user-quiz-registration">
          {isFetchingQuizData ? (
              <div>Fetching Quiz Details...</div>
      ) : (
          <>
              <div className="flex justify-between items-center mb-6">
                  <div className="user-quiz-registration-title">
                      Registration Form
                  </div>
                  <CrossIcon
                    className="cursor-pointer"
                    onClick={() => {
                setShowModal(false);
              }}
                  />
              </div>
              <div className="user-quiz-registration-basic-details">
                  <div className="user-quiz-registration-name">
                      <div
                        className={`user-quiz-registration-first-name ${userFirstName ? '' : 'hidden'
                  }`}
                      >
                          <TextField
                            id="First name"
                            placeholder="Enter First Name"
                            label="First Name"
                            error=""
                            val={firstName}
                            setVal={setFirstName}
                          />
                      </div>
                      <div
                        className={`user-quiz-registration-last-name ${userLastName ? '' : 'hidden'
                  }`}
                      >
                          <TextField
                            id="Last name"
                            placeholder="Enter Last Name"
                            label="Last Name"
                            error=""
                            val={lastName}
                            setVal={setLastName}
                          />
                      </div>
                  </div>
                  <div
                    className={`user-quiz-registration-contact ${userEmail ? '' : 'hidden'
                }`}
                  >
                      <div className="user-quiz-registration-contact-email">
                          <TextField
                            id="Email"
                            placeholder=""
                            label="Email"
                            error={emailError}
                            val={email}
                            setVal={setEmail}
                            disabled
                            pattern={REGEX.email}
                          />
                      </div>
                      <div
                        className={`user-quiz-registration-contact-contactno ${userPhoneNumber ? '' : 'hidden'
                  }`}
                      >
                          <TextField
                            id="Contact No."
                            placeholder="Candidate&#39;s contact number"
                            label="Contact No."
                            error={contactNoError}
                            val={contactNo}
                            setVal={setContactNo}
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
                        val={orgName}
                        setVal={setOrgName}
                      />
                  </div>
              </div>
              <div className={`user-quiz-registration-additional-details-title ${detail1.key || detail2.key || detail3.key ? '' : 'hidden'
            }`}
              >
                  Additional Details
              </div>
              {detail1.key && (
              <div
                className={`user-quiz-registration-field-input ${detail1.key ? '' : 'hidden'
                }`}
              >
                  <TextField
                    id="detail1"
                    placeholder={detail1.value}
                    label={detail1.key}
                    error={detail1Error}
                    val={detail1Value}
                    setVal={setDetail1Value}
                    isReq={detail1.isRequired}
                  />
              </div>
          )}
              {detail2.key && (
              <div
                className={`user-quiz-registration-field-input ${detail2.key ? '' : 'hidden'
                }`}
              >
                  <TextField
                    id="detail2"
                    placeholder={detail2.value}
                    label={detail2.key}
                    error={detail2Error}
                    val={detail2Value}
                    setVal={setDetail2Value}
                    isReq={detail2.isRequired}
                  />
              </div>
          )}
              {detail3.key && (
              <div
                className={`user-quiz-registration-field-input ${detail3.key ? '' : 'hidden'
                }`}
              >
                  <TextField
                    id="detail3"
                    placeholder={detail3.value}
                    label={detail3.key}
                    error={detail3Error}
                    val={detail3Value}
                    setVal={setDetail3Value}
                    isReq={detail3.isRequired}
                  />
              </div>
          )}
              <div className="user-quiz-registration-register-container">
                  <div>
                      <PrimaryCTA
                        text="Register"
                        onClick={handleRegisterParticipant}
                      />
                  </div>
              </div>
          </>
      )}
      </div>
  );
};
UserQuizRegistration.propTypes = {
  quizID: PropTypes.string.isRequired,
  mutateRegisterParticipant: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
export default UserQuizRegistration;
