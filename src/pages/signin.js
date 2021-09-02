import React, { Component } from 'react'
import Header from '../components/header'
import SignupAPI from '../api/signup'
import {setUsername} from '../actions/userActions'
import { instanceOf } from 'prop-types';
import cookie from 'react-cookies'
class Signin extends Component {
    constructor(props) {
        super(props)
        this.signup = new SignupAPI();
        this.state  = {
            authenticated : false,
        };
    }

    componentDidMount()
    {
        this.signup.checkAuthAtHome().then((res) =>{
            let registered = res.registered ;
            if(registered === false){
                window.location = "/signup";
            }
            else{
                this.signup.login(false).then((res) =>{
                    if(res.success === true){
                        localStorage.setItem('username' , res.username);
                        cookie.save('token', res.token, {path : '/'})                        
                        window.location = '/'
                    }
                 })
             }
         })
    }

    render() {

        return (
            <div>
                <Header logo loginStatus = {this.state.loginState} loginFunction = {this.login} signinPage = {true}/>
                {/* The rest of the home goes here. We can paste it or make a new component and render it. */}
            </div>
            )

    }
}

export default Signin
