import axiosInstance from './axiosInstance'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'

export const fetchPublicQuizzes = () => {
    return axiosInstance.get(`/home`)
}

export const createQuiz = (quiz) => {

    quiz.quizData.public = quiz.groupId === '' // seems redundant

    return axiosInstance.post(`/quizzes/?create=true`, quiz)
    // .then(res => {
    //     const body = res.data
    //     if(body.success === false) throw body.error
    //     else{
    //         return body.createdQuiz
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // })
}




export const fetchQuiz = (id, groupId) => {
    return axiosInstance.get(`/groups/${groupId}/quizzes/${id}`)
    // .then(res => {
    //     const body = res.data
    //     const error = body.error
    //     if (error) throw error
    //     if (body.quizData) {
    //         body.quizData.startTime = new Date(body.quizData.startTime)
    //         body.quizData.endTime = new Date(body.quizData.endTime)
    //         body.quizData.duration =  (body.quizData.endTime - body.quizData.startTime) / (1000 * 60)
    //         this.data = body.quizData
    //         this.data.time = body.time
    //     }
    // }).catch((err) => {
    //     console.log(err)
    // })
}

export const fetchQuizForAdmin = (id) => {
    return axiosInstance.get(`/quizzes/${id}/content=true`)
    // .then(res => {
    //     const body = res.data
    //     const error = body.error
    //     if (error) throw error
    //     if (body.quizData) {
    //         body.quizData.startTime = new Date(body.quizData.startTime)
    //         body.quizData.endTime = new Date(body.quizData.endTime)
    //         body.quizData.duration =  (body.quizData.endTime - body.quizData.startTime) / (1000 * 60)
    //         this.data = body.quizData
    //         this.data.time = body.time
    //     }
    // }).catch((err) => {
    //     console.log(err)
    // })
}


export const updateQuiz = (id, upd) => {

    return axiosInstance.post(`/quizzes/${id}`, upd)
    // .then(res => {
    //     const body = res.data
    //     if(body.success === false) throw body.error
    //     return body
    // })
    // .catch(error => {
    //     console.log(error)
    // })
}

export const updateSection = (id, sid, upd) => {

    return axiosInstance.post(`/quizzes/${id}/${sid}`, upd)
    // .then(res => {
    //     const body = res.data
    //     if(body.success === false) throw body.error
    //     return body
    // })
    // .catch(error => {
    //     console.log(error)
    // })
}


export const submitResponse = ({ sno, qno, sectionId, questionId }, response, resolve, reject) => {
    sectionId = sectionId || this.data.sections[sno]._id
    questionId = questionId || this.data.sections[sno].questions[qno]._id
    let username = localStorage.getItem('username');
    axiosInstance.post(this.postURL, { 'section': sectionId, 'question': questionId, 'username': username, 'response': response })
    //.then((res) => {
    //     const body = res.data
    //     const error = body.error || (!body.success ? 'unknown error' : null)
    //     if (error) {
    //         resolve({ error : true })
    //     } else {
    //         this.data.sections[sno].questions[qno].submitted = response
    //         resolve(body.response)
    //     }
    // }).catch(err => {
    //     reject(err)
    // })
}


export const fetchUserResponses = (username) => {
    return axiosInstance.get(this.responseURL + "&username=" + username)
    //     .then((res) => {
    //         const body = res.data
    //         const error = body.error
    //         if (error) {
    //             throw error
    //         } else {
    //             this.responses = body.responses
    //             return body.responses
    //         }
    //     }).catch((err) => {
    //         return err
    //     }
    // )
}



// MOVE TO Component
export const resetAnswers = () => {
    for (const sectionNo in this.data.sections) {
        for (const questionNo in this.data.sections[sectionNo].questions) {
            this.data.sections[sectionNo].questions[questionNo].answer = null
        }
    }
}

// MOVE TO Component
export const resetSubmissions = () => {
    let sectionIndex = {}
    let questionIndex = {}
    for (const sectionNo in this.data.sections) {
        let section = this.data.sections[sectionNo]
        sectionIndex[section._id] = sectionNo
        for (const questionNo in section.questions) {
            let question = section.questions[questionNo]
            questionIndex[question._id] = questionNo
        }
    }
    for (const responseNo in this.responses) {
        let response = this.responses[responseNo]
        let sid = response.sectionId
        let qid = response.questionId
        if (!qid || !sid) continue;
        // this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]] = {}
        this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].submitted = response.body
        this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].showCorrectionStatus = !response.history || !response.history.length ? false : true
        this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].evaluator = !response.history || !response.history.length ? '' : response.history[response.history.length - 1].evaluator
        this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]].markGiven = response.score
    }
}

// MOVE TO Component
export const convertOptionsToObject = () => {
    /// Make every option an object with id field(initially index), isAns field and value field
    for (let i = 0; i < this.data.sections.length; i++) {
        let section = this.data.sections[i];
        for (let j = 0; j < section.questions.length; j++) {
            let question = section.questions[j];
            if (question.isMCQ == true) {
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

// MOVE TO Component
export const resetMarkedQuestions = () => {
    for (const sectionNo in this.data.sections) {
        for (const questionNo in this.data.sections[sectionNo].questions) {
            this.data.sections[sectionNo].questions[questionNo].marked = false
        }
    }
}

// MOVE TO Component
export const updateQuizLocally = (upd) => {
    this.data = Object.assign(this.data, upd)
}

// MOVE TO Component
export const createSectionLocally = (sec) => {
    sec.questions = []
    this.data.sections.push(sec)
}

// MOVE TO Component
export const createQuestionLocally = ({ sno }, que) => {
    // console.log(sno, this.data.sections[sno])
    this.data.sections[sno].questions.push(que)
}

// MOVE TO Component
export const updateSectionLocally = ({ sno }, upd) => {
    this.data.sections[sno] = Object.assign(this.data.sections[sno], upd)
}

// MOVE TO Component
export const updateQuestionLocally = ({ sno, qno }, upd) => {
    this.data.sections[sno].questions[qno] = Object.assign(this.data.sections[sno].questions[qno], upd)
}

// MOVE TO Component
export const deleteSectionLocally = (sid) => {
    this.data.sections = this.data.sections.filter((section) => section._id !== sid);
}

// MOVE TO Component
export const deleteQuestionLocally = (sid, qid) => {
    this.data.sections.map(section => {
        if (section._id === sid) {
            section.questions = section.questions.filter(quest => quest._id !== qid);
        }
    })
}


// MOVE TO Component
export const updateAnswer = ({ sno, qno }, ans) => {
    this.data.sections[sno].questions[qno].answer = ans
}

// MOVE TO Component
export const markQuestion = ({ sno, qno }) => {
    this.data.sections[sno].questions[qno].marked ^= true
}