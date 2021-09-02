import React, { Component } from 'react'
import Textbox from '../textbox'
import Btn from '../buttons/btn'
import '../../styles/questionForm.scss'


export default class QuestionForm extends Component {
    submit = () => {
        this.props.onSubmit(this.props.username, this.props.name, this.props.bio, this.props.org , this.props.num)
    }
    returnQuestion = (sNo , Qno) =>{
        let currentSection  = this.props.quiz.sections[sNo] 
        let currentQuesiton = currentSection.questions[Qno] || { authors :"" , title: "" , body : " " , isMCQ : "" , autocheck : "" , options :[]}
        return currentQuesiton ;
    }
    render() {
        let CurrQuestion = this.props.question;
        let optionBox ;
        if(this.props.isMCQ){
             optionBox = 
                <div className = "long-text">
                <div className = "option-text">
                <Textbox placeholder = "Option1" value = {this.props.options[1]} onchange = {this.props.onChange} name = "option1" req = {true}/>
                </div>
                <div className = "option-text">
                <Textbox placeholder = "Option2" value = {this.props.options[2]} onchange = {this.props.onChange} name = "option2"/>
                </div>
                <div className = "option-text">
                <Textbox placeholder = "Option3" value = {this.props.option[3]} onchange = {this.props.onChange} name = "option3"/>
                </div>
                <div className = "option-text">
                <Textbox placeholder = "Option4" value = {this.props.option[4]} onchange = {this.props.onChange} name = "option4"/>
                </div>
                
            </div> 
            }
            let answer;
            if(this.props.autocheck)
            {
                answer = <div className = "long-text">
                <Textbox placeholder = "Answer" value = {CurrQuestion.answer} onchange = {this.props.onChange} name = "answer" req = {true}/>
                </div> 
            }
        return (
            <div>
                <div className = "form-container">
                   <div className = "long-text">
                   <Textbox placeholder = "Question Title" value = {CurrQuestion.title} onchange = {this.props.onChange} name = "title" req = {true}/>
                   </div>
                   <div className = "long-text">
                   <Textbox placeholder = "Question Body" value = {CurrQuestion.body} onchange = {this.props.onChange} name = "body" req = {true}/>
                   </div> 
                    <div>
                        <div>MCQ or Not?</div>
                        <div>True</div><input type ="checkbox" name = "isMCQ" value = {true} onClick = {this.props.onChange} ></input>
                        <div>False</div><input type ="checkbox" name = "isMCQ" value = {false} onClick = {this.props.onChange} ></input>
                    </div>
                    <div>
                        <div>Autocheck or Not?</div>
                        <div>True</div><input type ="checkbox" name = "autocheck" value = {true} onClick = {this.props.onChange} ></input>
                        <div>False</div><input type ="checkbox" name = "autocheck" value = {false} onClick = {this.props.onChange} ></input>
                    </div>
                    {optionBox}
                    {answer}
                </div>
            </div>
        )
    }
}
