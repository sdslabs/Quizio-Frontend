import React from 'react';
import OAuthButton from '@components/Buttons/OAuthButton';
import { baseURL } from '../../config/config';

const LoginWithGoogle = () => (
    <a href={`${baseURL}/auth/google`}>
        <OAuthButton label="Continue with Google" id="google" />
    </a>
);

export default LoginWithGoogle;
