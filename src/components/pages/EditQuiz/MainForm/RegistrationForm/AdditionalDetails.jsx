/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import log from '@utils/log';
import RegistrationFormCustomInput from './RegistrationFormCustomInput';

const AdditionalDetails = ({ fields, setFields }) => {
  const [required1, setRequired1] = useState(false);
  const [required2, setRequired2] = useState(false);
  const [required3, setRequired3] = useState(false);
  const [fieldName1, setFieldName1] = useState('');
  const [fieldLabel1, setFieldLabel1] = useState('');
  const [fieldName2, setFieldName2] = useState('');
  const [fieldLabel2, setFieldLabel2] = useState('');
  const [fieldName3, setFieldName3] = useState('');
  const [fieldLabel3, setFieldLabel3] = useState('');

  useEffect(() => {
    setFields({
      detail1: {
        key: fieldLabel1,
        value: fieldName1,
        isRequired: required1,
      },
      detail2: {
        key: fieldLabel2,
        value: fieldName2,
        isRequired: required2,
      },
      detail3: {
        key: fieldLabel3,
        value: fieldName3,
        isRequired: required3,
      },
    });
  }, [
    required1,
    required2,
    required3,
    fieldLabel1,
    fieldLabel2,
    fieldLabel3,
    fieldName1,
    fieldName2,
    fieldName3,
  ]);

  useEffect(() => {
    log('update');
    setFieldLabel1(fields?.detail1?.key);
    setFieldLabel2(fields?.detail2?.key);
    setFieldLabel3(fields?.detail3?.key);

    setFieldName1(fields?.detail1?.value);
    setFieldName2(fields?.detail2?.value);
    setFieldName3(fields?.detail3?.value);

    setRequired1(fields?.detail1?.isRequired);
    setRequired2(fields?.detail2?.isRequired);
    setRequired3(fields?.detail3?.isRequired);
  }, [fields]);

  return (
      <div className="registration-form-additional-details">
          <RegistrationFormCustomInput
            id={1}
            fieldName={fieldName1 || ''}
            setFieldName={setFieldName1}
            fieldLabel={fieldLabel1 || ''}
            setFieldLabel={setFieldLabel1}
            required={required1 || false}
            setRequired={setRequired1}
          />
          <RegistrationFormCustomInput
            id={2}
            fieldName={fieldName2 || ''}
            setFieldName={setFieldName2}
            fieldLabel={fieldLabel2 || ''}
            setFieldLabel={setFieldLabel2}
            required={required2 || false}
            setRequired={setRequired2}
          />
          <RegistrationFormCustomInput
            id={3}
            fieldName={fieldName3 || ''}
            setFieldName={setFieldName3}
            fieldLabel={fieldLabel3 || ''}
            setFieldLabel={setFieldLabel3}
            required={required3 || false}
            setRequired={setRequired3}
          />
      </div>
  );
};
AdditionalDetails.propTypes = {
  fields: PropTypes.object,
  setFields: PropTypes.func,
};

AdditionalDetails.defaultProps = {
  fields: {},
  setFields: () => {},
};

export default AdditionalDetails;
