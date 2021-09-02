// libs
import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import cookie from 'react-cookies'
import { Provider } from "react-redux"
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'

// files
import './index.css'
import App from './App'
import store from './store/configureStore'

// set the auth token from cookies in headers
let token = cookie.load('quiz') || null
axios.defaults.headers.common['Authentication'] = token

ReactDOM.render((
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </CookiesProvider>
), document.getElementById('root'))
