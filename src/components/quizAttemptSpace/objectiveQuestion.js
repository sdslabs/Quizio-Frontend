import React, {Component} from 'react'

export default class ObjectiveQuestion extends Component {
    onChange = (event) => {
        const target = event.target
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, target.value)
    }

    render() {
        let data = this.props.data
        return (
            <form className="qoptions">
                {
                    data.options.map((option, optionNo) => {
                        let optionClassName = "qoption "
                        if (data.submitted === option) {
                            optionClassName += "submitted "
                        }
                        return (
                            <label key={optionNo} className={optionClassName}>
                                <input type="radio" value={option} checked={data.answer === option} onChange={this.onChange} />
                                {option}
                            </label>
                        )
                    })
                }
            </form>
        )
    }
}
