import React, {useEffect, useState } from 'react'
import CarouselSlide from './slider'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

const Carousel = (props) => {

    const [activeIndex, setActiveIndex] = useState([])
    const [noSections, setNoSections] = useState(0)
    const [slideIndex, setSlideIndex] = useState(0)

    const toggleSection = (index) => {
        let currentArr = activeIndex
        currentArr[index - 1] = 1 ^ currentArr[index - 1]
        setActiveIndex(currentArr)
        props.setSliderIndex(currentArr)
    }

    const goToPrevSlide = (e) => {
        e.preventDefault();
        state.slideIndex > 0 && setSlideIndex(slideIndex - 1)
    }

    const goToNextSlide = (e) => {
        e.preventDefault();
        state.slideIndex + 7 < noSections && setSlideIndex(slideIndex + 1)

    }

    useEffect(() => {
        setSlideIndex(props.slideIndex ? props.slideIndex : slideIndex)
    }, [props.slideIndex])

    useEffect(() => {
        setNoSections(props.noSections)
    }, [props.noSections])

    useEffect(() => {
        setActiveIndex(props.activeIndex ? props.activeIndex : Array.from(new Array(props.noSections), () => 0))
    }, [props.activeIndex])


    return (props.state == 2 ? (
        <div className="carousel flex">
            <button type="button" className="slider" onClick={e => goToPrevSlide(e)}>
                <i className="fa fa-arrow-circle-o-left arrow" aria-hidden="true"></i>
            </button>
            <div className="section-slider flex wrap">
                {Array.from(new Array(noSections), (x, i) => i + state.slideIndex).map(function (i) {
                    return (<CarouselSlide index={i + 1} onClick={toggleSection} className={!activeIndex[i] ? "grayedBtn" : ""} slideIndex={state.slideIndex} />)
                }, this)}
            </div>
            <button type="button" className="slider" onClick={e => goToNextSlide(e)}>
                <i className="fa fa-arrow-circle-o-right arrow" aria-hidden="true"></i>
            </button>
        </div>
    ) : (""))



}
export default Carousel