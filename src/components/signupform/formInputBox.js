import React, { Component } from 'react'
import '../../styles/modules/signupForm.scss'
export default class FormInputBox extends Component {
    render() {
        return (
            <div className = "flex form-input-box-container">
              {!this.props.isSelect &&
                <input className = "form-input-box"
                  id = "form-input-box-id"
                  type = {this.props.type}
                  placeholder = {this.props.placeholder || ''}
                  name = {this.props.name}
                  value = {this.props.value}
                  onChange = {this.props.onChange}
                  required = {this.props.required || false}
                  readOnly = {this.props.readOnly || false}/>
              }
              {
                this.props.isSelect &&
                  <select className = "select-course" name={this.props.name} value = {this.props.value} onChange = {this.props.onChange} required>
                      <option value="">Course</option>
                      <option value="BTECH" className = "course-option">BTECH</option>
                      <option value="MTECH" className = "course-option">MTECH</option>
                      <option value="PHD" className = "course-option">PHD</option>
                  </select>
              }
            </div>
        )
    }
}
