import React, { useEffect, useState } from 'react'
import * as qs from 'query-string'
import Header from '../components/header'
import { fetchQuiz, fetchUserResponses } from '../api/quizzes'
import { updateMarks } from '../api/response'
import ControlPanel from '../components/controlPanel'
import QuizAttemptSpace from '../components/quizAttemptSpace'

const UserResults = (props) => {
    let parsed = qs.parse(props.location.search)
    const [userId, setUserId] = useState(parsed['username']) // responseapi.userId
    const [quizId, setQuizId] = useState(props.match.params.quizId) // quizapi.id, responseapi.id
    const [activeSno, setActiveSno] = useState(0)
    const [activeQno, setActiveQno] = useState(null)
    const [data, setData] = useState({
        sections: [],
        endTime,
        time,
        title
    })
    const [time, setTime] = useState(0)
    const [responses, setResponses] = useState([])

    const [current, setCurrent] = useState({})
    const [quiz, setQuiz] = useState([])

    const isValid = ({ Sno, Qno }) => {
        if (!Sno) return true
        if (Sno > data.sections.length || Sno < 0) {
            return false
        }
        if (!Qno) return true

        const currentSection = data.sections[Sno]
        if (Qno > currentSection.questions.length || Qno < 0) {
            return false
        }

        return true
    }

    const prepareSection = (no) => {
        if (!isValid({ Sno: no })) {
            return {}
        }

        const currentSection = data.sections[no]
        let score = 0

        if (currentSection.questions) {
            currentSection.questions.forEach((question) => {
                score = score + (question.marks || 0)
            })
        }
        return {
            type: 's',
            Sno: no,
            title: currentSection.title,
            body: currentSection.description,
            info: {
                marks: score,
                noOfQuestions: currentSection.questions.length
            }
        }
    }

    const prepareQuestion = (Sno, no) => {
        if (!isValid({ Sno, Qno: no })) {
            return {}
        }
        const currentSection = data.sections[Sno]
        const currentQuestion = currentSection.questions[no]
        let ansType = "long"
        if (currentQuestion.autocheck) {
            ansType = "short"
        }
        return {
            type: 'q',
            Sno: Sno,
            Qno: no,
            title: currentQuestion.title,
            body: currentQuestion.body,
            options: currentQuestion.options || [],
            answer: currentQuestion.answer,
            submitted: currentQuestion.submitted,
            marked: currentQuestion.marked,
            showCorrectionStatus: currentQuestion.showCorrectionStatus,
            evaluator: currentQuestion.evaluator,
            score: currentQuestion.markGiven,
            userResults: true,
            ansType,
            info: {
                marks: currentQuestion.marks,
                authors: currentQuestion.authors || []
            }
        }
    }

    const resetSubmissions = () => {
        let sectionIndex = {}
        let questionIndex = {}

        for (const sectionNo in data.sections) {
            let section = data.sections[sectionNo]
            sectionIndex[section._id] = sectionNo

            for (const questionNo in section.questions) {
                let question = section.questions[questionNo]
                questionIndex[question._id] = questionNo
            }
        }

        for (const responseNo in responses) {
            let response = responses[responseNo]
            let sid = response.sectionId
            let qid = response.questionId
            if (!qid || !sid) continue;
            // this.data.sections[sectionIndex[sid]].questions[questionIndex[qid]] = {}
            let newData = { ...data }
            newData.sections[sectionIndex[sid]].questions[questionIndex[qid]].submitted = response.body
            newData.sections[sectionIndex[sid]].questions[questionIndex[qid]].showCorrectionStatus = !response.history || !response.history.length ? false : true
            newData.sections[sectionIndex[sid]].questions[questionIndex[qid]].evaluator = !response.history || !response.history.length ? '' : response.history[response.history.length - 1].evaluator
            newData.sections[sectionIndex[sid]].questions[questionIndex[qid]].markGiven = response.score
        }
    }

    const resetAnswers = () => {
        for (const sectionNo in data.sections) {
            let section = data.sections[sectionNo]
            let newData = { ...data }
            for (const questionNo in section.questions) {
                newData.sections[sectionNo].questions[questionNo].answer = null
            }
            setData(newData)
        }
    }


    useEffect(() => {
        fetchQuiz(quizId)
            .then((res) => {
                let body = res.data
                if (body.quizData) {
                    let newData = { ...body.quizData }
                    newData.startTime = new Date(body.quizData.startTime)
                    newData.endTime = new Date(body.quizData.endTime)
                    newData.duration = (body.quizData.endTime - body.quizData.startTime) / (1000 * 60)
                    newData.time = body.time
                    setData(newData)
                }
                fetchUserResponses(userId, props.checkOwnership)
                    .then((res) => {
                        let body = res.data
                        let responses = body.responses
                        setResponses(responses)
                        resetSubmissions()
                        !responses.success && resetAnswers();

                        setCurrent(prepareSection(0))
                        setActiveSno(0)
                        setActiveQno(null)
                        setTime((data.endTime.getTime() - data.time) / 1000)
                        let newQuiz = data.sections.map((section, sectionNo) => {
                            let active = false
                            if (!sectionNo) active = true
                            return {
                                number: sectionNo,
                                title: section.title,
                                active,
                                questions: section.questions.map((question, questionNo) => {

                                    return {
                                        Sno: sectionNo,
                                        number: questionNo,
                                        marked: false,
                                        attempted: !!data.sections[sectionNo].questions[questionNo].submitted,
                                        active: false
                                    }
                                })
                            }
                        })
                        setQuiz(newQuiz)
                    })
            }, [])
    })



    const changeCurrent = (type, Sno, Qno) => {

        let newQuiz = { ...quiz }
        newQuiz[activeSno].active = false
        newQuiz[Sno].active = true
        if (activeQno) {
            newQuiz[activeSno].questions[activeQno].active = false
        }

        switch (type) {
            case 's':
                return {
                    quiz: newQuiz,
                    current: prepareSection(Sno),
                    activeSno: Sno,
                    activeQno: null
                }
            case 'q':
                newQuiz[Sno].questions[Qno].active = true
                return {
                    quiz: newQuiz,
                    current: prepareQuestion(Sno, Qno),
                    activeSno: Sno,
                    activeQno: Qno
                }

        }
    }

    const mark = (Sno, Qno) => {
        if (!isValid({ Sno, Qno })) return

        let newQuiz = { ...quiz }
        newQuiz[Sno].questions[Qno].marked ^= true
        data.sections[Sno].questions[Qno].marked ^= true
        setQuiz(newQuiz)
        setCurrent(prepareSection(Sno, Qno))

    }

    const showSubmitStatus = (success) => {
        let successMsg = "Score Updated Successfully!"
        let failedMsg = "Can't Update Score!"

        // TODO no dom manipulation like this :(
        if (success) {
            document.getElementById("submission-status").innerHTML = "✓ " + successMsg
            setTimeout(function () {
                document.getElementById("submission-status").innerHTML = ""
            }, 2000)
        } else {
            document.getElementById("submission-status").innerHTML = "✘ " + failedMsg
            setTimeout(function () {
                document.getElementById("submission-status").innerHTML = ""
            }, 2000)
        }
    }

    const submit = (Sno, Qno, ans) => {
        if (!isValid({ Sno, Qno })) return
        let questionId = data.sections[Sno].questions[Qno]._id
        let update = {
            'update': {
                questionId,
                'score': ans
            }
        }
        if (!data.sections[Sno].questions[Qno].isMCQ) {
            updateMarks(update)
                .then((res) => {
                    let response = res.data
                    showSubmitStatus(response.success)

                    if (response.success) {
                        let newData = { ...data }

                        newData.sections[Sno].questions[Qno].showCorrectionStatus = true
                        newData.sections[Sno].questions[Qno].evaluator = localStorage.getItem('username') // Need better method (cookie)
                        newData.sections[Sno].questions[Qno].markGiven = ans
                        setData(newData)
                        setCurrent(prepareQuestion(Sno, Qno))
                    }
                })
        } else {
            showSubmitStatus(false)
        }
    }


    const saveAnswer = (Sno, Qno, ans) => {
        if (!isValid({ Sno, Qno })) return
        data.sections[Sno].questions[Qno].answer = ans
        setCurrent(prepareQuestion(Sno, Qno))
    }

    return (
        <>
            <Header logo />
            <div className="flex wrap">
                <ControlPanel
                    change={changeCurrent}
                    quiz={quiz}
                    timerIcon={false}
                />
                <QuizAttemptSpace
                    time={time}
                    onMark={mark}
                    onSubmit={submit}
                    onUpdate={saveAnswer}
                    current={current}
                    change={changeCurrent}
                    quiz={quiz}
                    quizTitle={data ? data.title : ''}
                />
            </div>
        </>
    );
}


export default UserResults
