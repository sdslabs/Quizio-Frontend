import React, { useEffect, useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/user_quiz_registration.scss';
import { REGEX } from '@constants/constants';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
// import { useParams } from 'react-router';
import { useRegisterParticipant } from '@api/register/useRegister';
import PropTypes from 'prop-types';
import { getQuizById } from '@api/quizzes/quizzesFetcher';
import { useSelector } from 'react-redux';

const UserQuizRegistration = ({
  quizID,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailID, setEmailID] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [quiz, setQuiz] = useState('');
  const [detail1, setDetail1] = useState('');
  const [detail2, setDetail2] = useState('');
  const [detail3, setDetail3] = useState('');
  const [detail1Value, setDetail1Value] = useState('');
  const [detail2Value, setDetail2Value] = useState('');
  const [detail3Value, setDetail3Value] = useState('');
  const [loading, setLoading] = useState(true);

  // const [quizID] = useState('');
  // const { quizID } = useParams();
  const { mutate: mutateRegisterParticipant } = useRegisterParticipant();
  const userEmail = useSelector((state) => state.auth.user?.email);
  const userFirstName = useSelector((state) => state.auth.user?.firstName);
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  //  const userPhoneNumber = useSelector((state) => state.auth.user?.phoneNumber);

  //  const username = useSelector((state) => state.auth.user?.username);

  // const userContactNo = useSelector((state) => state.auth.user.phones);
  console.log(userEmail);
  // const { data, isLoading, isSuccess } = useGetUserDetails();
  // useEffect(() => {
  //   console.log({ quizID });
  // }, [quizID]);
  useEffect(async () => {
    const res = await getQuizById({ quizId: quizID });
    console.log('here');
    console.log(res);
    if (res.success) {
      setQuiz(res.data.quiz);

      setDetail1(quiz.detail1);

      setDetail2(quiz.detail2);
       setDetail3(quiz.detail3);
    }
setLoading(false);
  }, []);
const handleRegisterParticipant = () => {
  console.log(quizID);
  mutateRegisterParticipant({ quizId: quizID });
  console.log('after');
};
// if (isLoading) return <div>Loading...</div>;
return (
    <div className="user-quiz-registration">
        {loading ? (
            <div>Fetching Quiz Details</div>
    ) : (
        <>
            <div className="user-quiz-registration-title">Registration Form</div>
            <div className="user-quiz-registration-basic-details">
                <div className="user-quiz-registration-name">
                    <div className="user-quiz-registration-first-name">
                        <TextField
                          id="First name"
                          placeholder={userFirstName}
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
                          placeholder={userLastName}
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
                          placeholder={userEmail}
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
UserQuizRegistration.propTypes = {
  quizID: PropTypes.string.isRequired,
};
export default UserQuizRegistration;
