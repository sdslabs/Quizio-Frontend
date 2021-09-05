import React, { Component } from 'react';
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

const DateTimeInput = (props) => {
    // need onChange function(for input value) and initValue as props
    let yesterday = moment().subtract(1, "day");

    const valid = (current) => {
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
        onChange={props.onChange}
        initialValue={props.initValue || moment()}
    />;
}

export default DateTimeInput