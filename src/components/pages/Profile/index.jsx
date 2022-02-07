import React, { useState, useEffect } from 'react';
import gmail from '@icons/gmail.svg';
import phone from '@icons/phone.svg';
import facebook from '@icons/facebook.svg';
import instagram from '@icons/instagram.svg';
import linkedin from '@icons/linkedin.svg';
import PropTypes from 'prop-types';

const Profile = () => {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [hostedQuizzes, setHostedQuizzes] = useState([]);

  useEffect(() => {
    setAttemptedQuizzes([
      {
        title: 'Quiz 1',
        creator: 'Rohith',
        imageURL: './blackbird.jpg',
        description: 'This is a quiz',
        date: '2020-05-05',
        checked: true,
      },
      {
        title: 'Quiz 2',
        creator: 'Rohith',
        imageURL: './blackbird.jpg',
        description: 'This is a quiz',
        date: '2020-05-05',
        checked: false,
      },
    ]);
    setHostedQuizzes([]);
  }, []);
  return (
      <div>
          <div className="absolute w-full h-14 shadow-sm py-3 px-40">
              <div className="text-xl font-bold text-purple-V6">Quizio</div>
          </div>
          <div className="mx-40 pt-32">
              <div className="flex flex-row justify-evenly">
                  <ProfileCard />
                  <div className="h-52 w-40 rounded bg-purple-V1 flex flex-col justify-center items-center">
                      <div className="text-6xl font-semibold text-purple-V6 pb-4">{attemptedQuizzes.length}</div>
                      <div className="text-xl text-center text-purple-V6">Attempted</div>
                      <div className="text-xl text-center text-purple-V6">Quizzes</div>
                  </div>
                  <div className="h-52 w-40 rounded bg-purple-V1 flex flex-col justify-center items-center">
                      <div className="text-6xl font-semibold text-purple-V6 pb-4">{hostedQuizzes.length}</div>
                      <div className="text-xl text-center text-purple-V6">Hosted</div>
                      <div className="text-xl text-center text-purple-V6">Quizzes</div>
                  </div>
              </div>

              <div className="pt-12 pb-9 text-purple-V6 font-semibold text-xl">Attempted Quizzes</div>

              <div className="flex flex-col">
                  {attemptedQuizzes.map((quiz) => (
                      <QuizCard
                        title={quiz.title}
                        creator={quiz.creator}
                        imageURL={quiz.imageURL}
                        description={quiz.description}
                        date={quiz.date}
                        checked={quiz.checked}
                      />
          ))}
              </div>
          </div>
      </div>
  );
};
const QuizCard = ({
 title, creator, imageURL, description, date, checked,
}) => (
    <div className="relative w-full h-36 my-2 rounded border border-solid border-purple-V6 border-opacity-60">
        <div className="flex flex-row">
            <div className="p-4">
                <img src={imageURL} className="h-28 w-28 object-cover rounded" alt="QuizImage" />
            </div>
            <div className="flex flex-grow flex-col p-4">
                <div className="align-middle pb-2">
                    <div className="float-left text-sm font-semibold">{title}</div>
                    <div className="float-left text-xs text-black-1"> | Created By: </div>
                    <div className="float-left text-xs text-purple-V6">{creator}</div>
                </div>

                <div className="text-grey-N6 text-ellipsis">{description}</div>
                <div className="pb-1">
                    <div className="float-left text-grey-N6">Scheduled: </div>
                    <div className="float-left text-black-1">{date}</div>
                </div>
                <div>
                    <>
                        {checked === true ? (
                            <a href="www.google.com">
                                <button type="button" className="bg-purple-V6 text-white px-4 py-2 rounded">
                                    View Report
                                </button>
                            </a>
            ) : (
                <div className="pt-2 text-purple-V6 font-semibold text-sm">Unchecked</div>
            )}
                    </>
                </div>
            </div>
        </div>
    </div>
);

QuizCard.propTypes = {
  title: PropTypes.string,
  creator: PropTypes.string,
  imageURL: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  checked: PropTypes.bool,
};

QuizCard.defaultProps = {
  title: '',
  creator: '',
  imageURL: '',
  description: '',
  date: '',
  checked: false,
};

const ProfileCard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [institute, setInstitute] = useState('');
  const [city, setCity] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [facebookURL, setFacebookURL] = useState('');
  const [instagramURL, setInstagramURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');

  useEffect(() => {
    setName('Rohith');
    setEmail('exmaple@gmail.com');
    setPhoneNumber('9898988989');
    setInstitute('IIT Roorkee');
    setCity('Chandigarh');
    setImageURL('./blackbird.jpg');
    setFacebookURL('');
    setInstagramURL('');
    setLinkedinURL('');
  }, []);
  return (
      <div className="relative h-52 w-8/12 shadow-lg rounded">
          <div className="flex flex-row">
              <div className="flex flex-col w-40 py-4 px-2">
                  <img src={imageURL} className="h-36 w-36 rounded-full object-cover" alt="Profile" />
                  <div className="text-center text-purple-V6 py-1">
                      <a href="https://github.com/">Edit Details</a>
                      {' '}
                      {/* #TODO add edit details link */}
                  </div>
              </div>

              <div className="flex flex-grow flex-col p-4">
                  <div className="text-2xl text-purple-V6 font-bold pt-3">{name}</div>
                  <div className="text-black-1">{institute}</div>
                  <div className="text-purple-V6">{city}</div>
                  <div className="pt-4 gap-x-2 flex flex-row">
                      <img src={gmail} className="h-4 w-5" alt="Gmail" />
                      <div className="text-sm text-black-1">{email}</div>
                  </div>
                  <div className="pt-1 flex gap-x-2 flex-row">
                      <img src={phone} className="h-4 w-5" alt="Phone" />
                      <div className="text-sm text-black-1">{phoneNumber}</div>
                  </div>
              </div>
              <div className="flex flex-col gap-y-6 px-8 mt-12">
                  <a href={facebookURL}>
                      <img src={facebook} className="h-6 w-6" alt="Facebook" />
                  </a>
                  <a href={instagramURL}>
                      <img src={instagram} className="h-6 w-6" alt="Instagram" />
                  </a>
                  <a href={linkedinURL}>
                      <img src={linkedin} className="h-6 w-6" alt="Linkedin" />
                  </a>
              </div>
          </div>
      </div>
  );
};

export default Profile;
