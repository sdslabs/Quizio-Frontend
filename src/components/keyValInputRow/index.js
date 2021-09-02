import React, { Component } from 'react'
import '../../styles/modules/keyValInputRow.scss'

export default class KeyValInputRow extends Component {
    render() {
        return (
            <div className = "flex row formRow">
                <div className = "inputTitleContainer">
                    <div className = "inputTitle">{this.props.title}</div>
                </div>
                {this.props.type=="checkbox" && 
                    <input className = "inputBox" 
                    type = {this.props.type} 
                    name = {this.props.name} 
                    checked = {this.props.checked}
                    onChange = {this.props.onChange} />
                }
                {this.props.type!="checkbox" &&
                    <input className = "inputBox" 
                    type = {this.props.type} 
                    placeholder = {this.props.placeholder || ''} 
                    name = {this.props.name} 
                    value = {this.props.value} 
                    onChange = {this.props.onChange} 
                    readOnly = {this.props.readOnly || false}/>
                }
            </div>
        )
    }
}
