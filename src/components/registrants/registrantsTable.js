import React, { Component } from 'react'
import TableHeading from './heading'
import Table from './index'
import '../../styles/modules/registrants.scss'

export default class RegistrantsTable extends Component {
    render() {
        let {registrants} = this.props

        return (
            <div className='grid table-container' id='registrants-container'>
                <TableHeading value='Registrants' />
                <Table headRow={true}/>
                {Object.keys(registrants).map((index) => {
                    return (
                        <Table headRow={false} quizId={this.props.quizId} registrant={registrants[index]} Sno={index} />
                    )
                })}
            </div>
        )
    }
}