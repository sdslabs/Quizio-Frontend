import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';
import Switch from 'react-switch';
import '@pagestyles/create_quiz/registration_form.scss';

const RegistrationFormCustomInput = ({
  id, fieldName, setFieldName, fieldLabel, setFieldLabel, required, setRequired,
}) => (
    <div className="w-full px-8% pl-4 pr-4 pb-7">
        <div className="flex justify-between">
            <div className="flex text-grey-N10">
                {`Custom Field ${id}`}
                <p className={`text-red  ${required ? 'visible' : 'invisible'}`}>&nbsp;*</p>
            </div>
            <div className="flex justify-between">
                <div className="text-sm text-grey-N6">Required&nbsp;&nbsp;</div>
                <div>
                    <Switch
                      onChange={setRequired}
                      checked={required}
                      offColor="#DADADA"
                      onColor="#604195"
                      uncheckedIcon={false}
                      checkedIcon={false}
                      height={15}
                      width={30}
                    />
                </div>
            </div>
        </div>
        <div className="mt-4">
            <TextField
              id={`Field Name ${id}`}
              placeholder="Enter a field name"
              label="Field Name"
              error=""
              val={fieldName}
              setVal={setFieldName}
            />
        </div>
        <div className="mt-4">
            <TextField
              id={`Field Label ${id}`}
              placeholder="Enter its field label"
              label="Field Label"
              error=""
              val={fieldLabel}
              setVal={setFieldLabel}
            />
        </div>
    </div>
);

RegistrationFormCustomInput.propTypes = {
  id: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired,
  setFieldName: PropTypes.func.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  setFieldLabel: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  setRequired: PropTypes.func.isRequired,
};

RegistrationFormCustomInput.defaultProps = {
};

export default RegistrationFormCustomInput;
