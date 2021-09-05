import React from 'react';
import '../../styles/modules/groupName.scss';

const GroupName = (props) => {

    return (
        <div className="group-container">
            <div className="icon">  G </div>
            <div className="group-name"> {props.name}</div>
        </div>
    )
}

export default GroupName