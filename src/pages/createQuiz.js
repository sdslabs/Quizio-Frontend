import React, { Component } from 'react'
import Header from '../components/header'
import QuizzesAPI from '../api/quizzes'
import QuizRegisterForm from '../components/quizRegistration/registerForm'

class makeQuiz extends Component {
    constructor(props) {
        super(props)
        this.onUpdate = this.onUpdate.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.submit = this.submit.bind(this);
        this.sectionData =  { title : " " , score : " " , description : " " , questions : [] };
        
        this.state  = {
            quizData : {
                title : "",
                startTime : Date.now(),
                endTime : Date.now(),
                accessCode: "",
                public: true
            }, 
            groupId: ""
        };
    }

    onUpdate(event) {
        const prop = event.target.name;
        if (prop == 'groupId'){
            this.setState(Object.assign(this.state, {groupId: event.target.value}))
        }else{
            let newQuizData = this.state.quizData
            newQuizData[prop] = event.target.value
            this.setState(Object.assign(this.state, {quizData: newQuizData}))
        }
    }

    onChangeStart(value) {
        let newQuizData = this.state.quizData
        newQuizData["startTime"] = String(value._d)
        this.setState(Object.assign(this.state, {quizData: newQuizData}))
    }

    onChangeEnd(value) {
        let newQuizData = this.state.quizData
        newQuizData["endTime"] = String(value._d)
        this.setState(Object.assign(this.state, {quizData: newQuizData}))
    }

    submit = () => {
        let upd = {quizData : this.state.quizData, 
                    groupId : this.state.groupId};
        QuizzesAPI.createQuiz(upd)
        .then((res) =>{   
            window.location = "/admin/" + res._id
        })
    }

    render() {
        return (
            <div>
                <Header logo/>
                <QuizRegisterForm data={this.state.quizData} onSubmit = {this.submit} onUpdate = {this.onUpdate} onChangeStart = {this.onChangeStart} onChangeEnd = {this.onChangeEnd}/>
            </div>
        )
    }
}

export default makeQuiz;
