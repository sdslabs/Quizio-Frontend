import React, { Component } from 'react'
import Header from '../components/header'
import SignupAPI from '../api/signup'
import SignupForm from '../components/signupform'
import Modal from '../components/popup'
import Btn from '../components/buttons/btn.js'
import '../styles/modules/signupForm.scss'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.signup = new SignupAPI();
        this.state  = {
            userData : {
                username : "",
                fname : "",
                lname : "",
                bio : "",
                num : "",
                org : "",
                enrl: "",
                course: "",
                codeforces : "",
                codechef : "",
                github : "",
            },
            submit_state : 0,
            modalActive : false,
            error_data : ""
        };
    }

    handleChange(event) {
        const userData = this.state.userData;
        const prop = event.target.name;
        userData[prop] = event.target.value;
         this.setState(
            {
                 userData : userData
            }
        )
      }

    submit = (username, name, bio , org, num , enrl , course , codeforces , codechef , github) => {
        let phoneno = /^\d{10}$/;
        this.setState(
            {
                submit_state : 1,
            }
        )
        if(!username || name === " ")
        {      this.setState(
                    {
                        modalActive : true,
                        req_error :"Username and First-Name are required fields" , //Can be better .
                    }
                )
        }
        else if(course === "")
        {      this.setState(
                    {
                        modalActive : true,
                        req_error :"Course Name is a required field" , //Can be better .
                    }
                )
        }
        else if(!num.match(phoneno)){
            this.setState(
                {
                    modalActive : true,
                    req_error :"Please enter a valid Contact Number" ,
                }
            )
        }
        else {
          this.signup.submit(username, name, bio , org, num , enrl , course , codeforces , codechef , github).then((error) =>{
                   console.log(error)
                    if(error.code === 11000){
                        this.setState({
                            modalActive : true,
                            req_error : "Username already taken. Please try with different username"
                        })
                    }else{
                        this.setState({
                            modalActive : true,
                            req_error : error.details[0].message
                          })
                    }


           })
        }
     }
     handleModalClose(){
        this.setState({
            modalActive :false,
        }
        )
     }
    render() {
        return (
            <div>
                <Header logo signinPage = {true} noProfile = {true}/>
                <SignupForm onSubmit = {this.submit} onChange = {this.handleChange}
                    username = {this.state.userData.username}
                    name = {this.state.userData.fname + " " + this.state.userData.lname}
                    bio = {this.state.userData.bio}
                    num = {this.state.userData.num}
                    org = {this.state.userData.org}
                    enrl = {this.state.userData.enrl}
                    course = {this.state.userData.course}
                    codeforces = {this.state.userData.codeforces}
                    codechef = {this.state.userData.codechef}
                    github = {this.state.userData.github}
                 />
                 { this.state.modalActive &&
                 <Modal>
                        <Btn onClick={this.handleModalClose} className="btn-popup" html='.' />
                       <div className = "alert-signup-popup"> {this.state.req_error}</div>
                </Modal>
                }
            </div>
            )
        }
}

export default Signup;
