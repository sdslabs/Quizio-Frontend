// libs
import React, { useState, useEffect } from "react";

// components
import Header from '../components/header'

// apis
import SignupAPI from '../api/signup'
import GroupsAPI from '../api/groups'


// import Cover from '../components/svg/cover'
// import Table from '../components/tables/index'
// import TableHeading from '../components/tables/heading'
// import GroupsCard from '../components/groupsCard/index'
// import NoQuizzes from '../components/noQuizzes'
import '../styles/partials/_base.scss'
import '../styles/modules/home.scss'


const Home = (props) => {
    const [authenticated, setAuthenticated] = useState(false);

    return (<>Quizio Home!</>);
}
export default Home
// class Home extends Component {
//     constructor(props) {
//         super(props)
//         this.signup = new SignupAPI()
//         this.quizData = []
//         this.state = {
//             authenticated: false,
//             upcomingQuizzes: [],
//             ongoingQuizzes: [],
//             pastQuizzes: [],
//             groups: []
//         }
//         this.groupsAPI = new GroupsAPI()
//     }

//     login = () => {
//         this.signup.login(true, (res) => {
//         }, (error) => {
//             console.log(error)
//         })
//     }

//     componentDidMount() {
//         this.signup.checkAuthAtHome().then((res) => {
//             let oauth = res.oauth
//             let authenticated = res.authenticated
//             let registered = res.registered
//             this.quizData = res.quizData
//             this.setState({
//                 registered: registered,
//                 authenticated: authenticated,
//                 oauth: oauth
//             })
//             if (res.success) {
//                 this.quizData.forEach(quiz => {
//                     let startTime = quiz.startTime.getTime()
//                     let endTime = quiz.endTime.getTime()
//                     if (startTime > Date.now()) {
//                         this.setState({
//                             upcomingQuizzes: [...this.state.upcomingQuizzes, quiz]
//                         })
//                     }
//                     else if (startTime < Date.now() && endTime >= Date.now()) {
//                         this.setState({
//                             ongoingQuizzes: [...this.state.ongoingQuizzes, quiz]
//                         })
//                         // this.state.upcomingQuizzes.push(quiz)
//                     } else {
//                         this.setState({
//                             pastQuizzes: [...this.state.pastQuizzes, quiz]
//                         })
//                     }
//                 })
//             }
//         }).catch(err => {
//             console.log(err)
//         })
//         //change the quizzes api function to pick the username by default
//         //change quizV2 so that it does not need the username parameter
//         let username = localStorage.getItem('username')
//         this.groupsAPI.fetchGroupsForUser().then((groups) => {
//             this.setState({
//                 groups: [groups]
//             })
//         })
//     }

//     render() {
//         if (this.state.authenticated === false) {
//             return (
//                 <div>
//                     <Cover className="align-center" oauth={this.state.oauth} />
//                 </div>
//             )
//         }
//         else {
//             return (
//                 <div>
//                     <Header logo loginStatus={true} loginFunction={this.login} />
//                     <div className='flex column space-around home-body'>
//                         <div className='flex space-evenly lower-body'>
//                             <div className='flex table-container'>
//                                 <TableHeading value='Ongoing Quizzes' />
//                                 {this.state.ongoingQuizzes.length ?
//                                     <Table headRow='true' quizzes={this.state.ongoingQuizzes} past={false} /> :
//                                     <NoQuizzes showImg={true} section='No Ongoing Quizzes' />
//                                 }
//                                 <TableHeading value='Upcoming Quizzes' />
//                                 {this.state.upcomingQuizzes.length ?
//                                     <Table headRow='true' quizzes={this.state.upcomingQuizzes} past={false} /> :
//                                     <NoQuizzes showImg={true} section='No Upcoming Quizzes' />
//                                 }
//                                 <TableHeading value='Past Quizzes' />
//                                 {this.state.pastQuizzes.length ?
//                                     <Table headRow='true' quizzes={this.state.pastQuizzes} past={true} /> :
//                                     <NoQuizzes showImg={true} section='No Past Quizzes' />
//                                 }
//                             </div>
//                             <GroupsCard home={true} groups={this.state.groups} />
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//     }
// }


