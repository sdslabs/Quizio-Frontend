import React, { Component } from 'react'
import Btn from '../buttons/btn'

const CarouselSlide = (props) => {
    const toggleSection = () => {
        props.onClick(props.index)
    }


    return (
        <Btn className={"section-toggle " + props.className + " " + props.index >= props.slideIndex && props.index < props.slideIndex + 8 ? "visibleBtn" : "invisibleBtn"}
            onClick={toggleSection}
            html={<div className={"button" + props.index}>Section {props.index}</div>}
            type="rounded" />
    );

}
export default CarouselSlide