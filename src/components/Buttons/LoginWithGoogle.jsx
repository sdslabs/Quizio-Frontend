import React from 'react';
import { baseURL } from '../../config/config';

const LoginWithGoogle = () => (
  <a href={`${baseURL}/auth/google`}>
    <button type="button" label="Continue with Google" className="bg-red-400">
      Continue with Google
    </button>
  </a>
);

export default LoginWithGoogle;
