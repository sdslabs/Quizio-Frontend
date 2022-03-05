/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/user_quiz_registration.scss';
import { REGEX } from '@constants/constants';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
// import { useParams } from 'react-router';
import { useRegisterParticipant } from '@api/register/useRegister';
import PropTypes from 'prop-types';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useSelector } from 'react-redux';

const UserQuizRegistrationModal = ({
  quizID,
}) => {
  console.log(quizID);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailID, setEmailID] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  // const [quiz, setQuiz] = useState('');
  const [detail1, setDetail1] = useState('');
  const [detail2, setDetail2] = useState('');
  const [detail3, setDetail3] = useState('');
  const [detail1Value, setDetail1Value] = useState('');
  const [detail2Value, setDetail2Value] = useState('');
  const [detail3Value, setDetail3Value] = useState('');
  const { mutate: mutateRegisterParticipant } = useRegisterParticipant();
  const { isLoading, data, isSuccess } = useGetQuiz(quizID);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const userFirstName = useSelector((state) => state.auth.user?.firstName);
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const userContactNumber = useSelector((state) => state.auth.user?.phoneNumber);
  // const { data, isLoading, isSuccess } = useGetUserDetails();
  // useEffect(() => {
  //   console.log({ quizID });
  // }, [quizID]);
  useEffect(() => {
    console.log(data, isSuccess, 'data');

    // if (isSuccess) {
    // }
  }, [isSuccess]);
  const handleRegisterParticipant = () => {
    console.log(quizID);
    mutateRegisterParticipant({ quizId: quizID });
    console.log('after');
  };
  return (
      <div className="user-quiz-registration">
          {isLoading ? (
              <div>Fetching Quiz Details</div>
      ) : (
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
                      <div className={`user-quiz-registration-contact-contactno ${userContactNumber ? '' : 'hidden'}`}>
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
                        placeholder={organisationName}
                        label="Organisation Name"
                        error=""
                        val={organisationName}
                        setVal={setOrganisationName}
                        additionalClassName="bg-grey-N2"
                        disabled
                      />
                  </div>
              </div>
              <div className="user-quiz-registration-additional-details-title">Additional Details</div>
              <div className={`user-quiz-registration-field-input ${detail1 ? '' : 'hidden'}`}>
                  <TextField
                    id="detail1"
                    placeholder={detail1}
                    label={detail1}
                    error=""
                    val={detail1Value}
                    setVal={setDetail1Value}
                  />
              </div>
              <div className={`user-quiz-registration-field-input ${detail2 ? '' : 'hidden'}`}>
                  <TextField
                    id="detail2"
                    placeholder={detail2}
                    label={detail2}
                    error=""
                    val={detail2Value}
                    setVal={setDetail2Value}
                  />
              </div>
              <div className={`user-quiz-registration-field-input ${detail3 ? '' : 'hidden'}`}>
                  <TextField
                    id="detail3"
                    placeholder={detail3}
                    label={detail3}
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
      )}
          ;
      </div>
  );
};
UserQuizRegistrationModal.propTypes = {
  quizID: PropTypes.string.isRequired,
};
export default UserQuizRegistrationModal;
