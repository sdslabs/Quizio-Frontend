import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useRegisterParticipant } from '@api/register/useRegister';
import TextField from '@components/Input/TextField';
import { REGEX } from '@constants/constants';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import log from '@utils/log';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import '@pagestyles/register/user_quiz_registration.scss';

const UserQuizRegistration = ({
  quizID,
  setShowModal,
  mutateRegisterParticipant,
}) => {
  // quiz data getter query
  const {
    data: quizData,
    isSuccess: quizDataSuccess,
    isFetching: isFetchingQuizData,
  } = useGetQuiz(quizID);
  // quiz registration mutation
  const {
    isSuccess: registerSuccess,
    data: registerData,
  } = useRegisterParticipant();

  // Local States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [orgName, setOrgName] = useState('');
  const [detail1, setDetail1] = useState({});
  const [detail2, setDetail2] = useState({});
  const [detail3, setDetail3] = useState({});
  const [detail1Value, setDetail1Value] = useState('');
  const [detail2Value, setDetail2Value] = useState('');
  const [detail3Value, setDetail3Value] = useState('');

  // Old data
  const userEmail = useSelector((state) => state.auth.user?.email);
  const userFirstName = useSelector((state) => state.auth.user?.firstName);
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const userPhoneNumber = useSelector((state) => state.auth.user?.phoneNumber);

  const handleRegisterParticipant = () => {
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
    log({ body });
    mutateRegisterParticipant({ body });
  };

  useEffect(() => {
    log('QUIZ ID:', { quizID }, false);
  }, [quizID]);

  useEffect(() => {
    if (quizDataSuccess) {
      log({ quiz: quizData?.quiz });
      log({ detail1: quizData?.quiz?.detail1 });
      setDetail1(quizData?.quiz?.detail1);
      setDetail2(quizData?.quiz?.detail2);
      setDetail3(quizData?.quiz?.detail3);
    }
  }, [quizDataSuccess, quizData]);

  useEffect(() => {
    if (registerSuccess) {
      log('registered!', { registerData });
      setShowModal(false);
    }
  }, [registerSuccess, registerData]);

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
              <div className="user-quiz-registration-title">Registration Form</div>
              <div className="user-quiz-registration-basic-details">
                  <div className="user-quiz-registration-name">
                      <div
                        className={`user-quiz-registration-first-name ${
                  userFirstName ? '' : 'hidden'
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
                        className={`user-quiz-registration-last-name ${
                  userLastName ? '' : 'hidden'
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
                    className={`user-quiz-registration-contact ${
                userEmail ? '' : 'hidden'
              }`}
                  >
                      <div className="user-quiz-registration-contact-email">
                          <TextField
                            id="Email"
                            placeholder=""
                            label="Email"
                            error=""
                            val={email}
                            setVal={setEmail}
                            disabled
                            pattern={REGEX.email}
                          />
                      </div>
                      <div
                        className={`user-quiz-registration-contact-contactno ${
                  userPhoneNumber ? '' : 'hidden'
                }`}
                      >
                          <TextField
                            id="Contact No."
                            placeholder="Candidate&#39;s contact number"
                            label="Contact No."
                            error=""
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
              <div className="user-quiz-registration-additional-details-title">
                  Additional Details
              </div>
              {detail1.key && (
              <div
                className={`user-quiz-registration-field-input ${
                detail1.key ? '' : 'hidden'
              }`}
              >
                  <TextField
                    id="detail1"
                    placeholder={detail1.value}
                    label={detail1.key}
                    error=""
                    val={detail1Value}
                    setVal={setDetail1Value}
                  />
              </div>
          )}
              {detail2.key && (
              <div
                className={`user-quiz-registration-field-input ${
                detail2.key ? '' : 'hidden'
              }`}
              >
                  <TextField
                    id="detail2"
                    placeholder={detail2.value}
                    label={detail2.key}
                    error=""
                    val={detail2Value}
                    setVal={setDetail2Value}
                  />
              </div>
          )}
              {detail3.key && (
              <div
                className={`user-quiz-registration-field-input ${
                detail3.key ? '' : 'hidden'
              }`}
              >
                  <TextField
                    id="detail3"
                    placeholder={detail3.value}
                    label={detail3.key}
                    error=""
                    val={detail3Value}
                    setVal={setDetail3Value}
                  />
              </div>
          )}
              <div className="user-quiz-registration-register-container">
                  <div>
                      <PrimaryCTA text="Register" onClick={handleRegisterParticipant} />
                  </div>
              </div>
          </>
      )}
      </div>
  );
};
UserQuizRegistration.propTypes = {
  quizID: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
  mutateRegisterParticipant: PropTypes.func.isRequired,
};
export default UserQuizRegistration;
