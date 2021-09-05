import React from 'react'
import Textbox from '../textbox'
import '../../styles/questionForm.scss'


const QuestionForm = (props) => {

    const submit = () => {
        props.onSubmit(props.username, props.name, props.bio, props.org, props.num)
    }


    const returnQuestion = (sNo, Qno) => {
        let currentSection = props.quiz.sections[sNo]
        let currentQuesiton = currentSection.questions[Qno] || { authors: "", title: "", body: " ", isMCQ: "", autocheck: "", options: [] }
        return currentQuesiton;
    }

    let CurrQuestion = props.question;
    let optionBox;
    if (props.isMCQ) {
        optionBox =
            <div className="long-text">
                <div className="option-text">
                    <Textbox placeholder="Option1" value={props.options[1]} onchange={props.onChange} name="option1" req={true} />
                </div>
                <div className="option-text">
                    <Textbox placeholder="Option2" value={props.options[2]} onchange={props.onChange} name="option2" />
                </div>
                <div className="option-text">
                    <Textbox placeholder="Option3" value={props.option[3]} onchange={props.onChange} name="option3" />
                </div>
                <div className="option-text">
                    <Textbox placeholder="Option4" value={props.option[4]} onchange={props.onChange} name="option4" />
                </div>

            </div>
    }
    let answer;
    if (props.autocheck) {
        answer = <div className="long-text">
            <Textbox placeholder="Answer" value={CurrQuestion.answer} onchange={props.onChange} name="answer" req={true} />
        </div>
    }
    return (
        <div>
            <div className="form-container">
                <div className="long-text">
                    <Textbox placeholder="Question Title" value={CurrQuestion.title} onchange={props.onChange} name="title" req={true} />
                </div>
                <div className="long-text">
                    <Textbox placeholder="Question Body" value={CurrQuestion.body} onchange={props.onChange} name="body" req={true} />
                </div>
                <div>
                    <div>MCQ or Not?</div>
                    <div>True</div><input type="checkbox" name="isMCQ" value={true} onClick={props.onChange} ></input>
                    <div>False</div><input type="checkbox" name="isMCQ" value={false} onClick={props.onChange} ></input>
                </div>
                <div>
                    <div>Autocheck or Not?</div>
                    <div>True</div><input type="checkbox" name="autocheck" value={true} onClick={props.onChange} ></input>
                    <div>False</div><input type="checkbox" name="autocheck" value={false} onClick={props.onChange} ></input>
                </div>
                {optionBox}
                {answer}
            </div>
        </div>
    )

}

export default QuestionForm