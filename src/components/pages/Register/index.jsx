import React from 'react';
import '@pagestyles/register/register.scss';
import Step1 from '@images/register-step1.svg';
import Step2 from '@images/register-step2.svg';
import Step3 from '@images/register-step3.svg';

const Register = () => {
  // const [step, setStep] = useState('1');
  // setStep('2');
  const step = '3';
  return (
      <div className="register-page">
          <div className="register-page-left-section">
              <div className="register-page-left-text">
                  {step === '1' ? 'Welcome to Quizio !' : ''}
                  {step === '2' ? 'Take a deep breath !' : ''}
                  {step === '3' ? 'Getting Started' : ''}
              </div>
              {/* <img src={step === '1' ? Step1 : <>{step === '2' ? Step2 : Step3}</>} alt="Register - Step1" /> */}
              <>{step === '1' ? <img src={Step1} alt="Register - Step1" /> : ''}</>
              <>{step === '2' ? <img src={Step2} alt="Register - Step2" /> : ''}</>
              <>{step === '3' ? <img src={Step3} alt="Register - Step3" /> : ''}</>
          </div>
          <div className="register-right-section">right</div>
      </div>
  );
};

export default Register;
