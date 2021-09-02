import axios from 'axios'
import config from '../config/config.js';
// require('./interceptor');
// require('./headerInterceptor');

export default class Response {
    constructor({ id, userId, query }) {
        this.id = id
        this.userId = userId
        this.query = query
        if(!this.userId){
            this.getURL = config.API.baseURL + 'responses/' + this.id + this.query
        }
        else{
            this.getURL = config.API.baseURL + 'responses/' + this.id + '/user?username=' + this.userId
            this.postURL = config.API.baseURL + 'responses/' + this.id + '/user?username=' + this.userId
        }
        this.URL = config.baseURL + this.id
    }

    fetchQuizResponse(){
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

    fetchQuizResponseForUser(){
        return axios.get(this.getURL)
        .then(res => {
            const body = res.data
            const error = body.error
            if (error) throw error
            return body
        }).catch(err => {
            return err
        })
    }

    updateMarks(update) {
        return axios.post(this.postURL, { update })
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
