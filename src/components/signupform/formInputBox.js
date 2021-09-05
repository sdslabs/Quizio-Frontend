import React from 'react'
import '../../styles/modules/signupForm.scss'


const FormInputBox = (props) => {

  return (
    <div className="flex form-input-box-container">
      {!props.isSelect &&
        <input className="form-input-box"
          id="form-input-box-id"
          type={props.type}
          placeholder={props.placeholder || ''}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required || false}
          readOnly={props.readOnly || false} />
      }
      {
        props.isSelect &&
        <select className="select-course" name={props.name} value={props.value} onChange={props.onChange} required>
          <option value="">Course</option>
          <option value="BTECH" className="course-option">BTECH</option>
          <option value="MTECH" className="course-option">MTECH</option>
          <option value="PHD" className="course-option">PHD</option>
        </select>
      }
    </div>
  )
}


export default FormInputBox