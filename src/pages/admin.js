import React, { Component } from 'react'
import Header from '../components/header'
import QuizzesAPI from '../api/quizzes'
import ResponseAPI from '../api/response'
import UsersAPI from '../api/user'
import AdminControlPanel from '../components/adminControlPanel'
import QuizModifySpace from '../components/quizModifySpace'
import moment from 'moment'
import '../styles/modules/form.scss'

class AdminPanel extends Component {

  constructor(props) {
    super(props);
    this.quizId = this.props.match.params.quizId;
    this.quiz = new QuizzesAPI({
      id: this.quizId,
      checkOwnership: true
    });
    this.query = '?autocheck=true'
    this.response = new ResponseAPI({
        id: this.quizId,
        query: this.query
    });
    this.users = new UsersAPI();
    this.registrantsEmail = []
    this.registrantsData = []
    this.state = {
      quiz : [],
      current : {}
    };
    this.questionSchema = { title: "" , body : "" , isMCQ : false , autocheck : false , options :[], answer: undefined, marks: 0};
    this.sectionSchema = {title : "" , description : "" , questions : [] }
  }

  prepareSection = (sno) => {
    if (!this.isValid({ sno: sno })) {
    }
    const currentSection = this.quiz.data.sections[sno]
    return {
        type: 's',
        sno,
        sid: currentSection._id,
        title: currentSection.title,
        description : currentSection.description,
        noOfQuestions: currentSection.questions.length,
        actionOnSubmit: this.state.quiz[sno].actionOnSubmit
    }
  }

  isValid = ({sno, qno}) => {
    if (sno === undefined) return true
    if (sno >= this.quiz.data.sections.length || sno < 0) {
        return false
    }
    if (qno === undefined) return true
    const currentSection = this.quiz.data.sections[sno]
    if (qno >= currentSection.questions.length || qno < 0) {
        return false
    }
    return true
  }

  prepareQuestion = (sno, qno) => {
    if (!this.isValid({ sno, qno })) {
        console.log("This question number is not valid")
    }
    const currentSection = this.quiz.data.sections[sno]
    const currentQuestion = currentSection.questions[qno]
    return {
        type: 'q',
        sno,
        qno,
        sid: currentSection._id,
        qid: currentQuestion._id,
        title: currentQuestion.title,
        body: currentQuestion.body,
        options: currentQuestion.options || [],
        answer: currentQuestion.answer,
        isMCQ: currentQuestion.isMCQ,
        autocheck: currentQuestion.autocheck,
        marks: currentQuestion.marks,
        actionOnSubmit: this.state.quiz[sno].questions[qno].actionOnSubmit
    }
  }

  prepareQuiz = () => {
    let quiz = Object.assign({}, this.quiz.data);
    // To ensure copy by value
    quiz.owners = quiz.owners.slice();
    delete quiz['sections']
    delete quiz['_id']
    delete quiz['creator']
    delete quiz['createdOn']
    delete quiz['registrants']
    quiz['startTime'] = moment(quiz.startTime).format("YYYY-MM-DDTHH:mm:ss")
    quiz['endTime'] = moment(quiz.endTime).format("YYYY-MM-DDTHH:mm:ss")
    return {
      type: 'quiz',
      actionOnSubmit: 'edit',
      ...quiz
    }
  }

  prepareRegistrants = () => {
    return {
      type: 'registrants',
      registrants: this.registrantsData
    }
  }

  changeCurrent = (type, sno, qno) => {
    this.setState((state) => {
        const newQuizState = state.quiz
        if (state.activeSno != null) {
          newQuizState[state.activeSno].active = false
        }
        if (state.activeQno != null) {
          newQuizState[state.activeSno].questions[state.activeQno].active = false
        }
        if(sno != null)
          newQuizState[sno].active = true
        if(qno != null)
          newQuizState[sno].questions[qno].active = true
        if (type === 's') {
            return {
                quiz: newQuizState,
                current: this.prepareSection(sno),
                activeSno: sno,
                activeQno: null,
            }
        } else if (type === 'q') {
            newQuizState[sno].questions[qno].active = true
            return {
                quiz: newQuizState,
                current: this.prepareQuestion(sno, qno),
                activeSno: sno,
                activeQno: qno,
            }
        } else if(type === 'quiz'){
          return {
            quiz: newQuizState,
            current: this.prepareQuiz(),
            activeSno: sno,
            activeQno: qno
          }
        } else if(type === 'registrants'){
          return {
            quiz: newQuizState,
            current: this.prepareRegistrants(),
            activeSno: sno,
            activeQno: qno
          }
        } else if(type === 'autoCheck'){
          return {
            quiz: newQuizState,
            current: {
              type: 'autoCheck',
              autochecked: false
            },
            activeSno: sno,
            activeQno: qno
          }
        } else{
          return {
            quiz: newQuizState,
            current: {},
            activeSno: sno,
            activeQno: qno
          }
        }
    })
  }

  saveCurrent = (sno, qno, upd) => {
    if (!this.isValid({sno, qno})){
      console.log("This sno and qno is invalid")
      return
    }
    // change the state of the question from saved to not saved
    if(this.state.current.type === "s"){
      this.quiz.updateSectionLocally({ sno }, upd)
      let newQuiz = this.state.quiz
      newQuiz[sno].title = this.quiz.data.sections[sno].title
      this.setState(Object.assign(this.state, {quiz: newQuiz, current: this.prepareSection(sno)}))
    }
    else if(this.state.current.type === "q"){
      this.quiz.updateQuestionLocally({ sno, qno }, upd )
      return this.setState(Object.assign(this.state, {current: this.prepareQuestion(sno, qno)}))       
    }
    else if(this.state.current.type === "quiz"){
      this.quiz.updateQuizLocally(upd)
      return this.setState(Object.assign(this.state, {current: this.prepareQuiz()}))
    }
  }

  create = (type, sid, sno) => {
    if(type === 's'){
      let sec = Object.assign({}, this.sectionSchema)
      let newQuiz = this.state.quiz
      if(newQuiz.length === 0){
        sid = '1'
      }
      else{
        sid = newQuiz[newQuiz.length-1].sid + 1
      }
      sno =  newQuiz.length
      sec._id = sid
      this.quiz.createSectionLocally(sec)
      newQuiz.push({
        sid,
        sno,
        title: "",
        active: false,
        questions: [],
        actionOnSubmit: 'create'
      })
      this.setState(Object.assign(this.state, {quiz: newQuiz}))
      this.changeCurrent(type, sno, null)      
    }
    else if(type === 'q'){
      let quest = Object.assign({}, this.questionSchema)
      let newQuiz = this.state.quiz
      let qno = newQuiz[sno].questions.length
      let qid
      if(newQuiz[sno].questions.length === 0){
        qid = '1'
      }
      else {
        qid = newQuiz[sno].questions[newQuiz[sno].questions.length - 1].qid + 1
      }
      quest._id = qid
      this.quiz.createQuestionLocally({sno}, quest)
      newQuiz[sno].questions.push({
        sno,
        sid,
        qno,
        qid,
        active: false,
        actionOnSubmit: 'create'
      })
      this.setState(Object.assign(this.state, {quiz: newQuiz}))
      this.changeCurrent(type, sno, qno)
    }
  }

  prepareQuizForAPI = () => {
    let quiz = Object.assign({}, this.quiz.data);
    // To ensure copy by value
    quiz.owners = quiz.owners.map(owner => {
      return owner.val
    });
    delete quiz['sections']
    delete quiz['_id']
    delete quiz['creator']
    delete quiz['createdOn']
    delete quiz['registrants']
    let startTime = (new Date(quiz.startTime)).getTime()
    let endTime = (new Date(quiz.endTime)).getTime()
    quiz.startTime = startTime
    quiz.endTime = endTime
    return quiz
  }

  prepareQuestionForAPI = (sno, qno) => {
    let currentSection = this.quiz.data.sections[sno]
    let currentQuestion = currentSection.questions[qno]
    let preparedQuestion = {
      title: currentQuestion.title,
      body: currentQuestion.body,
      isMCQ: currentQuestion.isMCQ,
      marks: currentQuestion.marks,
      autocheck: currentQuestion.autocheck
    }
    if(currentQuestion.isMCQ){
      preparedQuestion.options = currentQuestion.options.map(options => options.val)
    }
    if(currentQuestion.autocheck){
      preparedQuestion.answer = currentQuestion.answer
    }
    return preparedQuestion
  }

  prepareSectionForAPI = (sno) => {
    if (!this.isValid({ sno: sno })) {
      return
    }
    const currentSection = this.quiz.data.sections[sno]
    return {
        title: currentSection.title,
        description : currentSection.description
    }
  }

  // In the current implementation the quiz looks the way it was created. However we need to reorder things as it will look in the arena. Cuz the section created first will appear first there.
  createCurrentQuiz = ({sno, qno}) => {
    if (!this.isValid({sno, qno})) {
      console.log("This item is not valid.")
      return
    }
    if (this.state.current.type === 's'){
      let sec = this.prepareSectionForAPI(sno)
      let upd = {
        addSection: sec
      }
      this.quiz.updateQuiz(upd)
      .then(res => {
        let sections = res.result.sections
        let createdSection = sections[sections.length - 1]
        // should actually update everything except questions
        let upd = {
          _id: createdSection._id
        }
        this.quiz.updateSectionLocally({sno}, upd)
        let newQuiz = this.state.quiz
        newQuiz[sno].sid = createdSection._id
        newQuiz[sno].actionOnSubmit = 'edit'
        this.setState(Object.assign(this.state, {quiz: newQuiz, current: this.prepareSection(sno)}))
      })
    }
    else if(this.state.current.type === 'q'){
      let quest = this.prepareQuestionForAPI(sno, qno)
      if(this.state.quiz[sno].actionOnSubmit === 'create'){
        console.log("Please create the section first!!");
      }
      else{
        let upd = {
          addQuestion: [quest]
        }
        this.quiz.updateSection(this.state.current.sid, upd)
        .then(res => {
          let section = res.quiz.sections.filter((section) => {
            return section._id === this.state.current.sid
          })[0]
          let createdQuestion = section.questions[section.questions.length - 1]
          let qid = createdQuestion._id
          let upd = {
            _id: qid
          }
          this.quiz.updateQuestionLocally({sno, qno}, upd)
          let newQuiz = this.state.quiz
          newQuiz[sno].questions[qno].qid = qid
          newQuiz[sno].questions[qno].actionOnSubmit = 'edit'
          this.setState(Object.assign(this.state, {quiz: newQuiz, current: this.prepareQuestion(sno, qno)}))
        })
      }
    }
  }

  showSubmitStatus = (res, successMsg, failedMsg) => {
    if(!res.error) {
      document.getElementById("submission-status").innerHTML = "✓ " + successMsg
      setTimeout(function(){
          document.getElementById("submission-status").innerHTML = ""
      }, 2000)
    }else{
      document.getElementById("submission-status").innerHTML = "✘ " + failedMsg
      setTimeout(function(){
          document.getElementById("submission-status").innerHTML = ""
      }, 2000)
    }
  }

  updateCurrentQuiz = ({sno, qno}) => {
    if (!this.isValid({sno, qno})) {
      console.log("This item is not valid.")
      return
    }
    if (this.state.current.type === 's'){
      let sec = this.prepareSectionForAPI(sno)
      let upd = sec
      let sid = this.state.current.sid
      this.quiz.updateSection(sid, upd)
      .then(res => {
        this.showSubmitStatus(res, "Section Updated Successfully.", "Can't Update Section!")
      })
    }
    else if(this.state.current.type === 'q'){
      let quest = this.prepareQuestionForAPI(sno, qno)
      let upd = {
        questionId: this.state.current.qid,
        updateQuestion: quest
      }
      this.quiz.updateSection(this.state.current.sid, upd)
      .then(res => {
        this.showSubmitStatus(res, "Question Updated Successfully.", "Can't Update Question!")
      })
    }
    else if(this.state.current.type === 'quiz'){
      let quiz = this.prepareQuizForAPI()
      this.quiz.updateQuiz(quiz)
      .then(res => {
        this.showSubmitStatus(res, "Quiz Updated Successfully.", "Can't Update Quiz!")
      })
    }
  }

  deleteCurrentSection = () => {
    let sid = this.state.current.sid
    let sectionFound = false
    let newQuiz = this.state.quiz.filter((section) => {
      if(sectionFound){
        section.sno = section.sno-1;
        section.questions.map((question) => {
          question.sno = section.sno
        })
      }
      if(section.sid == sid){
        sectionFound = true
      }
      return section.sid != sid
    })
    return newQuiz
  }

  deleteCurrentQuestion = () => {
    let sid = this.state.current.sid
    let qid = this.state.current.qid
    let newQuiz = this.state.quiz.map((section) => {
      if(section.sid === sid){
        let newSection = Object.assign({}, section)
        newSection.active = false
        let questionFound = false
        newSection.questions = section.questions.map((question) => {
          if(questionFound){
            question.qno = question.qno-1;
          }
          if(question.qid == qid){
            questionFound = true
          }
          return question
        })
        newSection.questions = section.questions.filter(quest => quest.qid !== qid)
        return newSection
      }
      return section
    })
    return newQuiz
  }

  deleteCurrent = ({sno, qno}) => {
    if (!this.isValid({sno, qno})) {
      console.log("This item is not valid.")
      return
    }
    if (this.state.current.type === 's'){
      let sid = this.state.current.sid
      if(this.state.current.actionOnSubmit === 'create'){
        this.quiz.deleteSectionLocally(sid)
        let newQuiz = this.deleteCurrentSection()
        this.setState(Object.assign(this.state, {quiz: newQuiz, current: {}, activeSno: null, activeQno: null}))
      }
      else{
        let upd = {
          deleteSection: sid
        }
        this.quiz.updateQuiz(upd)
        .then(res => {
          this.quiz.deleteSectionLocally(sid)
          let newQuiz = this.deleteCurrentSection()
          this.setState(Object.assign(this.state, {quiz: newQuiz, current: {}, activeSno: null, activeQno: null}))
        })
        .catch(err => console.log(err))
      }
    }
    else if(this.state.current.type === 'q'){
      let sid = this.state.current.sid
      let qid = this.state.current.qid
      if(this.state.current.actionOnSubmit === 'create'){
        this.quiz.deleteQuestionLocally(sid, qid)
        let newQuiz = this.deleteCurrentQuestion()
        this.setState(Object.assign(this.state, {quiz: newQuiz, current: {}, activeSno: null, activeQno: null}))
      }
      else{
        let upd = {
          deleteQuestion: [qid]
        }
        this.quiz.updateSection(sid, upd)
        .then(res => {
          this.quiz.deleteQuestionLocally(sid, qid)
          let newQuiz = this.deleteCurrentQuestion()
          this.setState(Object.assign(this.state, {quiz: newQuiz, current: {}, activeSno: null, activeQno: null}))
        })
      }
    }
  }

  componentDidMount() {
    this.quiz.fetchQuizForAdmin().then(() => {
      let quiz = this.quiz.data.sections.map((section, sectionNo) => {
          let questions = section.questions.map((question, questionNo) => {
              return {
                  sno: sectionNo,
                  qno: questionNo,
                  qid: question._id,
                  sid: section._id,
                  active: false,
                  actionOnSubmit: 'edit'
              }
          })
          return {
                sid: section._id,
                sno: sectionNo,
                title: section.title,
                active: false,
                questions: questions,
                actionOnSubmit: 'edit'
            }
        })
      this.quiz.convertOptionsToObject()
      this.setState({
          quiz: quiz,
          current: {},
          activeSno: null,
          activeQno: null
      })
      this.registrantsEmail = this.quiz.data.registrants.map((registrant) => {
        return registrant.registrant
      })
      this.users.fetchUserDatafromUsersArray(this.registrantsEmail)
      .then((res) => {
        if(res)this.registrantsData = res
        this.registrantsData
        .sort((a, b) => b.enrollment < a.enrollment)
      })
      .catch((err) => {
        console.log(err)
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  autoCheck = () => {
    this.response.fetchQuizResponse()
    .then(res => {
        if(res.data && res.data.success===true){
          this.setState((state) => {
            const newQuizState = state.quiz
            return {
              quiz: newQuizState,
              current: {
                type: 'autoCheck',
                autochecked: true
              },
              activeSno: null,
              activeQno: null
            }
          })
        }
    })
    .catch(err => {
        console.log(err)
    })
  }

  submit = () => {
    let qno = this.state.current.qno
    let sno = this.state.current.sno
    let action = this.state.current.actionOnSubmit
    if(action === "edit"){
      this.updateCurrentQuiz({sno, qno})
    }
    else if(action === "create"){
      this.createCurrentQuiz({sno, qno});
    }
    else{
      console.log("Invalid actionOnSubmit");
    }
  }

  render() {
    return (
      <div>
          <Header logo/>
          <div className="flex wrap">
              <AdminControlPanel
                  change={this.changeCurrent}
                  create={this.create}
                  quiz={this.state.quiz}
                  autoCheck={this.autoCheck}
                  quizId={this.quizId}
              />
              <QuizModifySpace
                  onUpdate={this.saveCurrent}
                  submit={this.submit}
                  current={this.state.current}
                  delete={this.deleteCurrent}
                  change={this.changeCurrent}
                  quiz={this.state.quiz}
                  quizId={this.quizId}
              />
          </div>
      </div>
    );
  }
}

export default AdminPanel;