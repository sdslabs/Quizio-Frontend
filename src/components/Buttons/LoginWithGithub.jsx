import React from 'react';
import { baseURL } from '../../config/config';

const LoginWithGithub = () => (
    <a href={`${baseURL}/auth/github`}>
        <button type="button" label="Continue with Github" className="">
            Continue with Github
        </button>
    </a>
);

export default LoginWithGithub;
