import React, {Component} from 'react'
import '../../styles/modules/keyValInputRow.scss'
import Btn from '../buttons/btn'

export default class ObjectiveQuestion extends Component {
    
    onChange = (event) => {
        const target = event.target
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, target.value)
    }

    onOptionChange = (event) => {
        const target = event.target
        let value = target.value
        let newOptions = this.props.data.options
        newOptions = newOptions.map((option) => {
            if(option.id == target.name){
                option.val = value
            }
            return option
        })
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, {options: newOptions})
    }

    onOptionDelete = (event) => {
        const target = event.target
        let newOptions = this.props.data.options.filter((option) => option.id != target.name)
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, {options: newOptions})
    }

    onOptionAdd = (event) => {
        let newOptions = this.props.data.options
        let lastId;
        if(newOptions.length === 0){
            newOptions.push({
                id: 0,
                val: ""
            })
        }
        else{
            lastId = newOptions[newOptions.length-1].id
            newOptions.push({
                id: lastId+1,
                val: ""
            })
        }
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, {options: newOptions})
    }

    render() {
        // console.log(this.props, 'option');
        return (
            <div className="qoptions">
                {
                    this.props.data.options.map((option, optionNo) => {
                        let optionClassName = "flex qoption "
                        if (this.props.data.submitted === option) {
                            optionClassName += "submitted "
                        }
                        return (          
                                <div key={optionNo} className={optionClassName}>
                                    {/* {console.log(optionNo)} */}
                                    <div className = "inputTitleContainer">
                                        <div className = "inputTitle">
                                            <Btn className="question-btn"
                                                type="round"
                                                html="-"
                                                onClick={this.onOptionDelete}
                                                name={option.id}
                                            />
                                            {/* <button className="question-btn" onClick={this.onOptionDelete} name={option.id}>-</button> */}
                                        </div>
                                    </div>
                                    <input className = "inputBox" type="text" key={ this.props.data.sid + this.props.data.qid + option.id } value={option.val} name={option.id} onChange={this.onOptionChange} />
                                </div>
                        )
                    })
                }
                <div key="addQuestion" className = "inputTitleContainer">
                    <div className = "inputTitle">
                        <Btn className="question-btn"
                            type="round"
                            html="+"
                            onClick={this.onOptionAdd}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
