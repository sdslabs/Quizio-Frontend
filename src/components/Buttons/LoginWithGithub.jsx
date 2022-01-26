import React from 'react';
import OAuthButton from '@components/Buttons/OAuthButton';
import { baseURL } from '../../config/config';

const LoginWithGithub = () => (
    <a href={`${baseURL}/auth/github`}>
        <OAuthButton label="Continue with Github" id="github" />
    </a>
);

export default LoginWithGithub;
