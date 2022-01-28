import React from 'react';
import { baseURL } from '../../config/config';
import OAuthButton from './OAuthButton';

const LoginWithGithub = () => (
    <a href={`${baseURL}/auth/github`}>
        <OAuthButton label="Continue with Github" id="github" />
    </a>
);

export default LoginWithGithub;
