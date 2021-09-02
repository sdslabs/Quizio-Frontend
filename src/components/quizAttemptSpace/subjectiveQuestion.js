import React, {Component} from 'react'
import MarkDown from '../../parser/markdown'

export default class SubjectiveQuestion extends Component {
    constructor(props) {
        super(props)
        this.tabNavWrite = "btn-link navSelected"
        this.tabNavPreview = "btn-link"
        this.state = {
            write: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.keyDown = this.keyDown.bind(this)

    
    }
    componentDidMount(){
    }
    
    keyDown(evt){
        if(evt.keyCode === 9){
            evt.preventDefault();
            var val = evt.target.value,
            start = evt.target.selectionStart,
            end = evt.target.selectionEnd;
            evt.target.value = val.substring(0, start) + '\t' + val.substring(start);
            evt.target.selectionStart = evt.target.selectionEnd = start + 1;
            this.props.onUpdate(this.props.data.sno, this.props.data.qno, evt.target.value )

        }
        
    }
    handleClick(fieldName, e) {
        if(fieldName == "write") {
            this.setState({
                write: true
            })
            this.tabNavWrite = "btn-link navSelected"
            this.tabNavPreview = "btn-link"
        }else if(fieldName == "preview") {
            this.setState({
                write: false
            })
            this.tabNavWrite = "btn-link"
            this.tabNavPreview = "btn-link navSelected"
        }
    }
    
    onChange = (event) => {
        const target = event.target
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, target.value)
    }

    render() {
        const data = this.props.data
        let submissionClassName = "submission "
        if (!data.submitted) {
            submissionClassName += "hidden "
        }
        submissionClassName += "align-center"
        let responseContainer = []
        let ans = data.answer || ""
        if (data.ansType === "long") {
            responseContainer.push(<textarea className="response-container response-textarea align-center" id = "my-textarea" value={ans} onChange={this.onChange} key="0" onKeyDown = {this.keyDown}
            />)
        } else {
            responseContainer.push(<input className="response-container response-input" value={ans} onChange={this.onChange} key="0" />)
        }
        return (
            <div>
                <form className="response">
                    {
                        data.ansType === "long" ?
                        <nav className="tabnav align-center"> 
                            <button type="button" className={this.tabNavWrite + " write-tab"} onClick={(e) => this.handleClick("write", e)}>
                                Write
                            </button>
                            <button type="button" className={this.tabNavPreview + " preview-tab"} onClick={(e) => this.handleClick("preview", e)}>
                                Preview
                            </button>
                        </nav> :
                        ''
                    }
                    {
                        (this.state.write || data.ansType !== "long") ? 
                        responseContainer.map((container, containerNo) => {
                            return container
                        }): 
                        <div className="align-center preview">
                            <pre>
                                <MarkDown code={ans || ""}/>
                            </pre>
                        </div>
                    }
                </form>
                <div className={submissionClassName}>
                    <pre>
                        <MarkDown code={data.submitted || ""}/>
                    </pre>
                </div>
            </div>
        )
    }
}
