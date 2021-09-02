import React, { Component } from 'react'
import * as qs from 'query-string'
import QuizzesAPI from '../api/quizzes'
import ResponseAPI from '../api/response'
import Header from '../components/header'
import Table from '../components/result'
import ResultHeader from '../components/result/header'
import QuizResult from '../components/result/QuizResult'
import Carousel from '../components/slider'
import QuizResultSectionwise from '../components/result/QuizResultSectionwise';

class Results extends Component {
    constructor(props) {
        super(props)
        let parsed = qs.parse(this.props.location.search)
        this.result = []
        this.title = ''
        this.sectionTitle = []
        this.QuizResult = []
        this.resultSectionwise = []
        this.resultSectionwiseSorted = []
        this.responseResult = []
        this.customResults = []
        this.activeIndex= []
        this.formattedUserName = []
        this.userData = []
        this.formattedResult = []
        this.quizId = this.props.match.params.quizId
        this.registrants = []
        this.registrantsData = {}
        this.query = '?'
        if(parsed['autocheck']){
            if(this.query[this.query.length - 1] !== '?'){
                this.query += '&'
            }
            this.query += 'autocheck=' + parsed['autocheck']
        }
        this.quiz = new QuizzesAPI({
            id: this.props.match.params.quizId,
        })
        this.response = new ResponseAPI({
            id: this.props.match.params.quizId,
            query: this.query
        })
        this.state = {
            state: 0,
            result: [],
            customResult: [],
            sectionResult: [],
            dataFetched: false
        }
        this.toggleState = this.toggleState.bind(this)
        this.setActiveIndex = this.setActiveIndex.bind(this)
    }

    toggleState(toggle) {
        this.fetchData(toggle)
    }

    fetchData(toggle) {
        switch (toggle) {
            case 0:
                this.setState(() => {
                    return {
                        state: 0,
                    }
                })
                break;
            case 1:
                this.setState(() => {
                    return {
                        state: 1,
                    }
                })
                break;
            case 2:
                this.setState(() => {
                    return {
                        state: 2,
                    }
                })
                break;

            default:
                break;
        }
    }

    sortCustom() {
        this.customResults = []
        this.customResults = Object.keys(this.formattedUserName).map((index) =>  {
            let userScore = {}
            let userData = []
            this.userData.forEach(element => {
                if (element._id === this.formattedUserName[index]) {
                    userData.push(element)
                }
            })
            userScore[this.formattedUserName[index]] = 0
            Object.keys(this.responseResult).map(resIndex => {
                if(this.activeIndex[resIndex] === 1) {
                    userScore[this.formattedUserName[index]] += this.formattedResult[this.formattedUserName[index]][this.responseResult[resIndex]._id]
                }
            })
            userData[0]['score'] = userScore[this.formattedUserName[index]]
            return (<Table overAll={true} quizId={this.quizId} username={this.formattedUserName[index]} userResult={this.formattedResult[this.formattedUserName[index]]} Sno={index} userData={userData[0]} custom={1}/>)
        })
        this.customResults
        .sort((a, b) => b.props.userData['score'] - a.props.userData['score'])
        this.setState({
            customResult: [<QuizResult result={this.customResults} />]
        })
    }

    sortedObject() {
        // sort according to the score
        this.result
        .sort((a, b) => this.sum(b.props.userResult) - this.sum(a.props.userResult))
        this.setState({
            result: [<QuizResult result={this.result} />]
        })
        this.sortCustom()
        this.resultSectionwise.forEach(object => {
            object.result
            .sort((a, b) => parseFloat(b.props.userResult) - parseFloat(a.props.userResult))
            this.resultSectionwiseSorted.push(object)
        });
        let sectionResults = []
        let sectionIndex = 1
        this.resultSectionwiseSorted.forEach(object => {
            sectionResults.push(<QuizResultSectionwise result={object.result} sectionTitle={this.sectionTitle} section_id={object._id} sectionIndex={sectionIndex++}/>)
        });
        this.setState({
            sectionResult: sectionResults
        })
    }

    setActiveIndex(activeIndex) {
        this.activeIndex = activeIndex
        this.sortCustom()
    }

    componentDidMount() {
        this.quiz.fetchQuiz().then(() => {
            if (!this.quiz.data) {
                return
            }
            this.quiz.resetAnswers()
            this.registrants = this.quiz.data.registrants.map((registrant) => {
                return registrant.registrant;
            })
        })
        .catch((err) => {
            console.log(err)
        })
        this.response.fetchQuizResponse()
        .then(res => {
            let result = res.data.result
            this.QuizResult = result
            let defaultValue = {}
            this.title = res.data.title
            this.sectionTitle = res.data.sectionTitle
            result.forEach(section => {
                defaultValue[section._id] = 0
            });
            this.responseResult = result
            result.forEach(section => {
                section.result.forEach(resp => {
                    if(!this.formattedResult[resp.username]){
                        this.formattedResult[resp.username] = {...defaultValue}
                    }
                    this.formattedResult[resp.username][section._id] = resp.score
                })
            })
            this.registrants.forEach(registrant => {
                if(!this.formattedResult[registrant]){
                    this.formattedResult[registrant] = {...defaultValue}
                }
            })
            let formattedUsername = Object.keys(this.formattedResult)
            this.formattedUserName = formattedUsername
            this.userData = res.data.userData[0]
            this.result =  Object.keys(formattedUsername).map((index) =>  {
                let userData = []
                res.data.userData[0].forEach(element => {
                    if (element._id === formattedUsername[index]) {
                        userData.push(element)
                    }
                })
                return (<Table overAll={true} quizId={this.quizId} username={formattedUsername[index]} userResult={this.formattedResult[formattedUsername[index]]} Sno={index} userData={userData[0]}/>)
            })

            res.data.userData[0].forEach(element => {
                this.registrantsData[element._id]=element
            })

            this.resultSectionwise = Object.keys(result).map((index) => {
                let sectionwise = []
                let userInSection = {}
                let sno = 0
                sectionwise = Object.keys(result[index].result).map((row) =>  {
                    let arr = result[index].result[row]
                    let userData = []
                    userData.push(this.registrantsData[arr['username']])
                    userInSection[arr['username']] = true
                    return (<Table overAll={false} quizId={this.quizId} username={arr['username']} userResult={arr['score']} Sno={sno++} userData={userData[0]}/>)
                })

                Object.keys(this.registrantsData).forEach(registrantName => {
                    let registrantData = this.registrantsData[registrantName]
                    if(!userInSection[registrantName]){
                        userInSection[registrantName] = true
                        sectionwise.push(
                            <Table overAll={false} quizId={this.quizId} username={registrantName} userResult={0} Sno={sno++} userData={registrantData}/>
                        )
                    }
                })
                return {
                    result: sectionwise,
                    _id: result[index]._id
                }
            })
            this.setState(() => {
                return {
                    dataFetched:true
                }
            })
            this.sortedObject()
        })
        .catch(err => {
            //// Handle the error
            // Should I log it in console???
            // Or make an error page or something??
            console.log(err)
        })
    }

    sum( obj ) {
        var sum = 0;
        for( var ele in obj ) {
            sum += parseFloat( obj[ele]);
        }
        return sum;
    }

    render() {
        return (
            <div>
                <Header logo />
                <ResultHeader toggleState={this.toggleState} state={this.state.state} quizName={this.title}/>
                <Carousel sections={this.QuizResult} activeIndex={this.activeIndex} slideIndex={this.slideIndex} noSections={this.QuizResult.length} state={this.state.state} setSliderIndex={this.setActiveIndex}/>
                { !(this.state.state) ? "" 
                                      : ((this.state.state == 1) ? "" 
                                                                :"") }
                <div className='flex space-evenly wrap lower-body'>
                    { !(this.state.state) ? this.state.result
                                          : ((this.state.state == 1) ? this.state.sectionResult :this.state.customResult)
                    }
                </div>
            </div>
        )
    }
}

export default Results
