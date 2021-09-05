import React, { Component } from 'react'
import TableHeading from './heading'
import Table from './index'
import '../../styles/modules/registrants.scss'

const RegistrantsTable = (props) => {

    return (
        <div className='grid table-container' id='registrants-container'>
            <TableHeading value='Registrants' />
            <Table headRow={true} />
            {Object.keys(props.registrants).map((index) => {
                return (
                    <Table
                        headRow={false}
                        quizId={props.quizId}
                        registrant={props.registrants[index]}
                        Sno={index} />
                )
            })}
        </div>
    )

}

export default RegistrantsTable