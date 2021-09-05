import React from 'react'
import '../../styles/modules/header.scss'

const TableHeading = (props) => {

    return (
        <div className='heading' >
            <div className='logo heading-logo'>{props.value}</div>
        </div>
    )

}

export default TableHeading