import React, { Component } from 'react'
import Textbox from '../textbox'
import Btn from '../buttons/btn'
import FormInputBox from './formInputBox'

import '../../styles/modules/signupForm.scss'

export default class SignupForm extends Component {
    submit = () => {
        this.props.onSubmit(this.props.username, this.props.name, this.props.bio, this.props.org , this.props.num , this.props.enrl , this.props.course, this.props.codeforces , this.props.codechef, this.props.github)
    }

    render() {
        return (
            <div className = "signup-form-container">
              <div className = "flex signup-title-container">
                <div className = "signup-title">
                  <span>SignUp</span>
                </div>
                <div className = "signup-title-register">
                  Lets get you registerd first !
                </div>
              </div>

              <div className = "flex signup-input-container">
                <div className = "form-text-box-full">
                  <FormInputBox type="text" placeholder = "Username *" value = {this.props.username} onChange = {this.props.onChange} name = "username" required = {true}/>
                </div>

                <div className = "flex two-input-container">
                  <div className = "form-text-box-half">
                    <FormInputBox type="text" placeholder="First Name *" name="fname" value={this.props.fname} onChange={this.props.onChange} required = {true} />
                  </div>
                  <div className = "form-text-box-half">
                    <FormInputBox type="text" placeholder="Last Name" name="lname" value={this.props.lname} onChange={this.props.onChange} />
                  </div>
                </div>

                <div className = "flex two-input-container">
                  <div className = "form-text-box-half">
                    <FormInputBox type="text" placeholder = "Enrollment Number *" name = "enrl" value = {this.props.enrl} onChange = {this.props.onChange}  required = {true} />
                  </div>
                  <div className = "form-text-box-half">
                    <FormInputBox isSelect = {true} type="text"  name="course" value = {this.props.course} onChange = {this.props.onChange} />
                  </div>
                </div>

                <div className = "flex two-input-container">
                  <div className = "form-text-box-half">
                    <FormInputBox type="text" placeholder = "Branch" value = {this.props.org} onChange = {this.props.onChange} name = "org" />
                  </div>
                  <div className = "form-text-box-half">
                    <FormInputBox type="text" placeholder = "Contact Number" value = {this.props.num} onChange = {this.props.onChange} name = "num" />
                  </div>
                </div>

                <div className = "form-text-box-full">
                  <FormInputBox type="text" placeholder = "Bio *" value = {this.props.bio} onChange = {this.props.onChange} name = "bio" required = {true}/>
                </div>

                <div className = "flex two-input-container">
                  <div className = "form-text-box-half">
                    <FormInputBox type="text" placeholder = "Codeforces Handle" value = {this.props.codeforces} onChange = {this.props.onChange} name = "codeforces" />
                  </div>
                  <div className = "form-text-box-half">
                    <FormInputBox type="text" placeholder = "Codechef Handle" value = {this.props.codechef} onChange = {this.props.onChange} name = "codechef" />
                  </div>
                </div>

                <div className = "form-text-box-full">
                  <FormInputBox type="text" placeholder = "Github Handle" value = {this.props.github} onChange = {this.props.onChange} name = "github" />
                </div>
              </div>

              <div className = "flex signup-btn-container">
                <Btn className="submit-btn-signup"
                        type="rounded"
                        html="Submit"
                        onClick={this.submit}
                />
              </div>
            </div>
        )
    }
}
