
import React, { Component } from 'react'
import CarouselSlide from './slider'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

export default class Carousel extends Component {
    constructor(props) {
        super(props);

        this.toggleSection = this.toggleSection.bind(this);
        this.goToPrevSlide = this.goToPrevSlide.bind(this);
        this.goToNextSlide = this.goToNextSlide.bind(this);

        this.activeIndex = []
        this.noSections = 0
        this.state = {
        activeIndex: [],
        noSections: 0,
        slideIndex: 0
        };
    }

    toggleSection(index) {
        let currentArr = this.activeIndex
        currentArr[index-1] = 1^currentArr[index-1]
        this.setState(() => {
            return {
                activeIndex: currentArr
            }
        })
        this.activeIndex = currentArr
        this.props.setSliderIndex(currentArr)
    }

    goToPrevSlide(e) {
        e.preventDefault();
        if(this.state.slideIndex > 0) {
            this.setState({
                slideIndex: this.state.slideIndex - 1
            })
        }
    }

    componentWillReceiveProps(props) {
        this.noSections = props.noSections
        this.activeIndex = props.activeIndex ? props.activeIndex : Array.from(new Array(this.props.noSections), () => 0)
        this.setState({
            slideIndex: props.slideIndex ? props.slideIndex : this.state.slideIndex
        })
    }

    goToNextSlide(e) {
        e.preventDefault();
        if(this.state.slideIndex + 7 < this.noSections) {
            this.setState({
                slideIndex: this.state.slideIndex + 1
            })
        }
    }

    render() {
        let className = Array.from(new Array(this.noSections), (x,i) => "")
        className.map(function(e, index) {
            if(!this.activeIndex[index]) {
                className[index] += "grayedBtn"
            }
        }, this)
        if(this.props.state != 2) {
            return ("")
        }
        return (
            <div className="carousel flex">
                <button type="button" className="slider" onClick={e => this.goToPrevSlide(e)}>
                    <i className="fa fa-arrow-circle-o-left arrow" aria-hidden="true"></i>
                </button>
                <div className="section-slider flex wrap">
                    {Array.from(new Array(this.noSections), (x,i) => i + this.state.slideIndex).map(function (i) {
                        return( <CarouselSlide index={i+1} onClick={this.toggleSection} className={className[i]} slideIndex={this.state.slideIndex}/>)
                    }, this)}
                </div>
                <button type="button" className="slider" onClick={e => this.goToNextSlide(e)}>
                    <i className="fa fa-arrow-circle-o-right arrow" aria-hidden="true"></i>
                </button> 
            </div>
        );
    }
}