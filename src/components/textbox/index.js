import React, { Component } from 'react'
import '../../styles/modules/textBox.scss'

export default class Textbox extends Component {
    render() {
        
        return (
            <div className = "container">
                <input type = "text" 
                name = {this.props.name} 
                value = {this.props.value} 
                placeholder = {this.props.placeholder} 
                onChange = {this.props.onchange}
                required = {this.props.req}
                >
                
                </input>
            </div>
        )
    }
}
