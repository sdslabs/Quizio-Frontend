import React, { useEffect, useState } from 'react';
import log from '@utils/log';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import useCreateQuizStore from '@redux/store/zustand/createQuiz';
import { useGetQuiz, useUpdateQuiz } from '@api/quizzes/useQuizzes';
import BasicDetails from './BasicDetails';
import AdditionalDetails from './AdditionalDetails';
import '@pagestyles/create_quiz/registration_form.scss';

const RegistrationForm = () => {
  const { setCurrentStage, currentID } = useCreateQuizStore();
  const {
    isSuccess: isUpdateSuccess,
    mutate: mutateQuizDetails,
  } = useUpdateQuiz();
  const { data } = useGetQuiz(currentID);

  const [fields, setFields] = useState({
    detail1: {
      key: '',
      value: '',
      isRequired: false,
    },
    detail2: {
      key: '',
      value: '',
      isRequired: false,
    },
    detail3: {
      key: '',
      value: '',
      isRequired: false,
    },
  });

  useEffect(() => {
    setFields({
      detail1: data?.quiz?.detail1,
      detail2: data?.quiz?.detail2,
      detail3: data?.quiz?.detail3,
    });
  }, [data]);

  const handleSubmit = () => {
    console.log({ fields });
    mutateQuizDetails({ quizID: currentID, body: { ...fields } });
  };

  useEffect(() => {
    if (isUpdateSuccess) setCurrentStage('Registration form');
    else log('Failed to update quiz :(');
  }, [isUpdateSuccess]);

  return (
      <div className="registration-form">
          <div className="registration-form-title">Registration Form</div>
          <BasicDetails />
          <div className="registration-form-additional-details-title">
              Additional Details
          </div>
          <AdditionalDetails fields={fields} setFields={setFields} />
          <div className="w-full flex justify-end">
              <div className="w-50 flex justify-center pr-4">
                  <PrimaryCTA text="Start Adding Questions" onClick={handleSubmit} />
              </div>
          </div>
      </div>
  );
};

export default RegistrationForm;
