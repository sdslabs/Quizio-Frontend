// libs
import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'

// files
import './index.css'
import App from './App'
import store from './redux/reduxStore/store'


ReactDOM.render((
    <Provider store={store}>
        <CookiesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
    </Provider>
), document.getElementById('root'))
