import axios from 'axios'
import config from '../config/config.js';
// require('./interceptor');
// require('./headerInterceptor');

export default class Register {
    constructor({ id, userId }) {
        this.id = id
        this.userId = userId
        this.getURL = config.API.baseURL + 'registrations/' + this.id + '/' + this.userId
        this.postURL = config.API.baseURL + 'registrations/' + this.id
        this.exitURL = config.API.baseURL + 'registrations/' + this.id + '/exitQuiz/' + this.userId
    }

    isRegisteredForQuiz(){
        return axios.get(this.getURL)
        .then((res) => {
            const error = res.data.error
            if (error) throw error
            return res
        })
        .catch((err) => {
            return err
        })
    }

    registerForQuiz(accessCode){
        if(!this.userId) {
            return {
                success: false
            }
        }else {
            return axios.post(this.postURL, { accessCode: accessCode })
            .then(res => {
                const body = res.data
                const error = body.error
                if (error) throw error
                return body
            }).catch(err => {
                return err
            })
        }
    }

    exitQuiz(){
        return axios.post(this.exitURL)
        .then(res => {
            const body = res.data
            const error = body.error
            if (error) throw error
            return body
        }).catch(err => {
            return err
        })
    }
}
