import axios from 'axios'
import store from '../store/configureStore'
const config = require('../config/config.json')
require('./interceptor');
require('./headerInterceptor');

export default class Quizzes {
    constructor({ id, code, groupId, checkOwnership, checkRegistration }) {
        this.id = id
        this.code = code || ''
        this.groupId = groupId || null
        this.groupId ? (this.open = true) : (this.open = false)
        this.checkOwnership = checkOwnership || false
        this.checkRegistration = checkRegistration || false
        if (this.checkOwnership) {
            this.responseURL = config.API.baseURL + 'responses/' + this.id + '/user' + '?checkOwnership=true'
        } else {
            this.responseURL = config.API.baseURL + 'responses/' + this.id + '/user' + '?checkOwnership=false'
        }
        if (this.open) {
            this.postURL = config.API.baseURL + 'groups/' + this.groupId + '/quizzes/' + this.id
            this.fetchURL = config.API.baseURL + 'groups/' + this.groupId + '/quizzes/' + this.id
        } else {
            this.postURL = config.API.baseURL + "home/" + this.id
            this.fetchURL = config.API.baseURL + "home/" + this.id + '?checkRegistration=' + this.checkRegistration
        }
        this.URL = config.baseURL + this.id
    }

    static fetchPublicQuizzes() {
        const fetchURL = config.API.baseURL + 'home'
        return axios.get(fetchURL)
        .then(res => {
            let body = res.data
            if(body.error) throw body.error
            if(body.quizData){
                for(let i = 0; i<body.quizData.length; i++){
                    body.quizData[i].startTime = new Date(body.quizData[i].startTime)
                    body.quizData[i].endTime = new Date(body.quizData[i].endTime)
                    body.quizData[i].duration =  (body.quizData[i].endTime - body.quizData[i].startTime) / (1000 * 60)
                }
            }
            return body
        })
        .catch(err => {
            console.log(err)
        });
    }

    static createQuiz(quiz) {
        if(quiz.groupId == ""){
            quiz.quizData.public = true;
        }else{
            quiz.quizData.public = false;
        }
        const createURL = config.API.baseURL +'quizzes/?create=true';
        return axios.post(createURL, quiz)
        .then(res => {
            const body = res.data
            if(body.success === false) throw body.error
            else{
                return body.createdQuiz
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    convertOptionsToObject() {
        /// Make every option an object with id field(initially index), isAns field and value field
        for(let i=0; i<this.data.sections.length; i++){
            let section = this.data.sections[i];
            for(let j=0; j<section.questions.length; j++){
                let question = section.questions[j];
                if(question.isMCQ == true){
                    question.options = question.options.map((val, id) => {
                        return {
                            id,
                            val
                        }
                    });
                }
            }
        }
        this.data.owners = this.data.owners.map((owner, id) => {
            return {
                id,
                val: owner
            }
        })
    }


    fetchQuiz() {
        return axios.get(this.fetchURL).then(res => {
            const body = res.data
            const error = body.error
            if (error) throw error
            if (body.quizData) {
                body.quizData.startTime = new Date(body.quizData.startTime)
                body.quizData.endTime = new Date(body.quizData.endTime)
                body.quizData.duration =  (body.quizData.endTime - body.quizData.startTime) / (1000 * 60)
                this.data = body.quizData
                this.data.time = body.time
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    fetchQuizForAdmin() {
        this.quizURL = config.API.baseURL + 'quizzes/' + this.id + '?content=true'
        return axios.get(this.quizURL).then(res => {
            const body = res.data
            const error = body.error
            if (error) throw error
            if (body.quizData) {
                body.quizData.startTime = new Date(body.quizData.startTime)
                body.quizData.endTime = new Date(body.quizData.endTime)
                body.quizData.duration =  (body.quizData.endTime - body.quizData.startTime) / (1000 * 60)
                this.data = body.quizData
                this.data.time = body.time
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    resetAnswers() {
        for (const sectionNo in this.data.sections) {
            for (const questionNo in this.data.sections[sectionNo].questions) {
                this.data.sections[sectionNo].questions[questionNo].answer = null
            }
        }
    }

    resetSubmissions() {
        let sectionIndex = {}
        let questionIndex = {}
        for (const sectionNo in this.data.sections) {
            let section = this.data.sections[sectionNo]
            sectionIndex[section._id] = sectionNo
            for( const questionNo in section.questions){
                let question = section.questions[questionNo]
                questionIndex[question._id] = questionNo
            }
        }
        for(const responseNo in this.responses){
            let response = this.responses[responseNo]
            let sid = response.sectionId
            let qid = response.questionId
            if(!qid || !sid) continue;
            // this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]] = {}
            this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].submitted = response.body
            this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].showCorrectionStatus = !response.history || !response.history.length ? false : true
            this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].evaluator = !response.history || !response.history.length ? '' : response.history[response.history.length-1].evaluator
            this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].markGiven = response.score
        }
    }

    resetMarkedQuestions() {
        for (const sectionNo in this.data.sections) {
            for (const questionNo in this.data.sections[sectionNo].questions) {
                this.data.sections[sectionNo].questions[questionNo].marked = false
            }
        }
    }

    updateQuizLocally(upd) {
        this.data = Object.assign(this.data, upd)
    }

    createSectionLocally(sec){
        sec.questions = []
        this.data.sections.push(sec)
    }

    createQuestionLocally({sno}, que){
        // console.log(sno, this.data.sections[sno])
        this.data.sections[sno].questions.push(que)
    }

    updateSectionLocally({sno}, upd) {
        this.data.sections[sno] = Object.assign(this.data.sections[sno], upd)
    }

    updateQuestionLocally({sno, qno}, upd) {
        this.data.sections[sno].questions[qno] = Object.assign(this.data.sections[sno].questions[qno], upd)
    }

    deleteSectionLocally(sid) {
        this.data.sections = this.data.sections.filter((section) => section._id !== sid);
    }

    deleteQuestionLocally(sid, qid){
        this.data.sections.map(section => {
            if(section._id === sid){
                section.questions = section.questions.filter(quest => quest._id !== qid);
            }
        })
    }

    updateQuiz(upd) {
        let url = config.API.baseURL + 'quizzes/' + this.id
        return axios.post(url, upd)
        .then(res => {
            const body = res.data
            if(body.success === false) throw body.error
            return body
        })
        .catch(error => {
            console.log(error)
        })
    }

    updateSection(sid, upd) {
        let url = config.API.baseURL + 'quizzes/' + this.id + '/' + sid
        return axios.post(url, upd)
        .then(res => {
            const body = res.data
            if(body.success === false) throw body.error
            return body
        })
        .catch(error => {
            console.log(error)
        })
    }

    updateAnswer({sno, qno}, ans) {
        this.data.sections[sno].questions[qno].answer = ans
    }

    submitResponse({ sno, qno, sectionId, questionId }, response, resolve, reject) {
        sectionId = sectionId || this.data.sections[sno]._id
        questionId = questionId || this.data.sections[sno].questions[qno]._id
        let username = localStorage.getItem('username');
        axios.post(this.postURL, { 'section': sectionId, 'question': questionId, 'username': username, 'response': response }).then((res) => {
            const body = res.data
            const error = body.error || (!body.success ? 'unknown error' : null)
            if (error) {
                resolve({ error : true })
            } else {
                this.data.sections[sno].questions[qno].submitted = response
                resolve(body.response)
            }
        }).catch(err => {
            reject(err)
        })
    }

    markQuestion({sno, qno}) {
        this.data.sections[sno].questions[qno].marked ^= true
    }

    fetchUserResponses(username) {
        return axios.get(this.responseURL + "&username=" + username)
            .then((res) => {
                const body = res.data
                const error = body.error
                if (error) {
                    throw error
                } else {
                    this.responses = body.responses
                    return body.responses
                }
            }).catch((err) => {
                return err
            }
        )
    }

}
