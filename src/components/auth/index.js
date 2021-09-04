// App.js
import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config/config'
const apiUrl = config.API.baseURL;

axios.interceptors.request.use(
    config => {

        const token = localStorage.getItem('token');
        config.headers.Authorization = token;

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

function App() {
    const storedJwt = localStorage.getItem('token');
    const [jwt, setJwt] = useState(storedJwt || null);

    const getJwt = async () => {
        console.log("getting jwt!")
        const { data } = await axios.get(`${apiUrl}/home`);
        console.log(data)
        localStorage.setItem('token', data.token);
        setJwt(data.token);
    };

    return (

        <section style={{ marginBottom: '10px' }}>
            <button onClick={() => getJwt()}>Get JWT</button>
            {jwt && (
                <pre>
                    <code>{jwt}</code>
                </pre>
            )}
        </section>

    );
}
export default App;