import React, { useState, useEffect } from 'react';
import gmail from '@icons/gmail.svg';
import phone from '@icons/phone.svg';
import facebook from '@icons/facebook.svg';
import instagram from '@icons/instagram.svg';
import linkedin from '@icons/linkedin.svg';

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
    setName('Somesh Solanki');
    setEmail('someshmarider@gmail.com');
    setPhoneNumber('0123456789');
    setInstitute('Indian Institute of Technology, Roorkee');
    setCity('Jaipur, Rajasthan');
    setImageURL('./blackbird.jpg');
    setFacebookURL('');
    setInstagramURL('');
    setLinkedinURL('');
  }, []);
  return (
      <div className="relative h-52 w-9/12 shadow-lg rounded">
          <div className="flex flex-row">
              <div className="flex flex-col w-40 py-4 pl-2">
                  <img
                    src={imageURL}
                    className="h-36 w-36 rounded-full object-cover"
                    alt="Profile"
                  />
                  <div className="text-center text-purple-V6 py-1">
                      <a href="https://github.com/">Edit Details</a>
                      {' '}
                      {/* #TODO add edit details link */}
                  </div>
              </div>

              <div className="flex flex-grow flex-col p-4 pl-6">
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
export default ProfileCard;
