import React, { Component } from 'react'
import Btn from '../buttons/btn'

export default class CarouselSlide extends Component {
    toggleSection = () => {
        this.props.onClick(this.props.index)
    }

    render() {
        let visibleBtnClass = this.props.index>=this.props.slideIndex && this.props.index<this.props.slideIndex+8 ? "visibleBtn" : "invisibleBtn"
        return (
            <Btn className={"section-toggle "+this.props.className + " " + visibleBtnClass}
            onClick={this.toggleSection}
            html={<div className={"button"+this.props.index}>Section {this.props.index}</div>}
            type="rounded" />
        );
    }
}