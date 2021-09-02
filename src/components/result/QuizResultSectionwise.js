import React, { Component } from 'react'
import TableHeading from './heading'
import Table from './index'

export default class QuizResultSectionwise extends Component {
    render() {
        let sectionName = ''
        this.props.sectionTitle.forEach(element => {
            if (element.sectionId == this.props.section_id) {
                sectionName = 'Section ' + this.props.sectionIndex + ' - ' + element.title
            }
        });
        return (
            <div className='grid table-container margin-below'>
                <TableHeading value={sectionName} />
                <Table headRow='true'/>
                <table className="resultTable">{this.props.result}</table>
            </div>
        )
    }
}