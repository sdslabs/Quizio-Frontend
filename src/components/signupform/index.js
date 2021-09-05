import React, { Component } from 'react'
import Textbox from '../textbox'
import Btn from '../buttons/btn'
import FormInputBox from './formInputBox'

import '../../styles/modules/signupForm.scss'

const SignupForm = (props) => {
  const submit = () => {
    props.onSubmit(props.username, props.name, props.bio, props.org, props.num, props.enrl, props.course, props.codeforces, props.codechef, props.github)
  }


  return (
    <div className="signup-form-container">
      <div className="flex signup-title-container">
        <div className="signup-title">
          <span>SignUp</span>
        </div>
        <div className="signup-title-register">
          Lets get you registered first!
        </div>
      </div>

      <div className="flex signup-input-container">
        <div className="form-text-box-full">
          <FormInputBox type="text" placeholder="Username *" value={props.username} onChange={props.onChange} name="username" required={true} />
        </div>

        <div className="flex two-input-container">
          <div className="form-text-box-half">
            <FormInputBox type="text" placeholder="First Name *" name="fname" value={props.fname} onChange={props.onChange} required={true} />
          </div>
          <div className="form-text-box-half">
            <FormInputBox type="text" placeholder="Last Name" name="lname" value={props.lname} onChange={props.onChange} />
          </div>
        </div>

        <div className="flex two-input-container">
          <div className="form-text-box-half">
            <FormInputBox type="text" placeholder="Enrollment Number *" name="enrl" value={props.enrl} onChange={props.onChange} required={true} />
          </div>
          <div className="form-text-box-half">
            <FormInputBox isSelect={true} type="text" name="course" value={props.course} onChange={props.onChange} />
          </div>
        </div>

        <div className="flex two-input-container">
          <div className="form-text-box-half">
            <FormInputBox type="text" placeholder="Branch" value={props.org} onChange={props.onChange} name="org" />
          </div>
          <div className="form-text-box-half">
            <FormInputBox type="text" placeholder="Contact Number" value={props.num} onChange={props.onChange} name="num" />
          </div>
        </div>

        <div className="form-text-box-full">
          <FormInputBox type="text" placeholder="Bio *" value={props.bio} onChange={props.onChange} name="bio" required={true} />
        </div>

        <div className="flex two-input-container">
          <div className="form-text-box-half">
            <FormInputBox type="text" placeholder="Codeforces Handle" value={props.codeforces} onChange={props.onChange} name="codeforces" />
          </div>
          <div className="form-text-box-half">
            <FormInputBox type="text" placeholder="Codechef Handle" value={props.codechef} onChange={props.onChange} name="codechef" />
          </div>
        </div>

        <div className="form-text-box-full">
          <FormInputBox type="text" placeholder="Github Handle" value={props.github} onChange={props.onChange} name="github" />
        </div>
      </div>

      <div className="flex signup-btn-container">
        <Btn className="submit-btn-signup"
          type="rounded"
          html="Submit"
          onClick={submit}
        />
      </div>
    </div>
  )
}


export default SignupForm