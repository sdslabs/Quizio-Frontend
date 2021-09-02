import React,  {Component} from 'react';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";

class DateTimeInput extends Component {
    // need onChange function(for input value) and initValue as props
    render() {
        let yesterday = moment().subtract(1, "day");

        function valid(current) {
            return current.isAfter(yesterday);
        }

        return <Datetime 
            isValidDate={valid} 
            timeFormat="HH:mm:ss A" 
            timeConstraints={{
            hours: { min: 1, max: 12 },
            minutes: { min: 0, max: 59 },
            seconds: { min: 0, max: 59 }
            }} 
            onChange={this.props.onChange} 
            initialValue={this.props.initValue || moment()}
        />;
    }
}

export default DateTimeInput