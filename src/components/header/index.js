import React, { Component } from 'react'
import Logo from './logo'
import '../../styles/modules/header.scss'
class Header extends Component {
    submit = () => {
        this.props.loginFunction()
    }

    exitQuiz = () => {
        this.props.exitQuizFunction()
    }

    redirectProfile(){
        window.location="/users/profile";
    }
    render() {
        const {logo, bar, msg, icon } = this.props
        let name= this.props.signinPage === true?  " " : localStorage.getItem('username').toString();
        let initials = name.charAt(0).toUpperCase();
        const loginStatus = this.props.loginStatus;
        const exitQuizBtn = this.props.exitQuizBtn || false;

        let button, exitBtn;
        if(loginStatus === true){
            button = <button className = "logbutton" onClick = {this.submit}>Logout</button>
        }

        if(exitQuizBtn) {
            exitBtn = <button className = "exitQuizButton" onClick = {this.exitQuiz}>Submit Quiz</button>
        }

        return (
          <div className="header flex">
            {
                logo ? <Logo arena={this.props.arena} className="header-logo" /> : ''
            }
            
             {/* <div className="usernameStyle"> Welcome {name} !</div>  */}
            <div className = 'left-header'>
                    {
                        !this.props.noProfile ?
                        <div className = "profile-pic-header-container" onClick = {this.redirectProfile}>
                            <div className = "profile-pic-header">{initials}</div>
                        </div> :
                        ''
                    }
                    {exitBtn}
                
                    {button}
            </div>
            </div>
        )
    }
}

export default Header
//
