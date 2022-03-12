import React, { useState } from 'react';
import { REGEX } from '@constants/constants';
import TextField from '@components/Input/TextField';

const BasicDetails = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailID, setEmailID] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [organisationName, setOrganisationName] = useState('');

  return (
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
  );
};
BasicDetails.propTypes = {};

export default BasicDetails;
