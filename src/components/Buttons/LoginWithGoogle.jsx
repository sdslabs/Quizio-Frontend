import React from 'react';
import { baseURL } from '../../config/config';

const LoginWithGoogle = () => (
  <a href={`${baseURL}/auth/google`} className="w-5 text-red-600">
    <button type="button" label="Login with Google" className="w-5 text-red-600 bg-yellow-300">
      Login with Google
    </button>
  </a>
);

export default LoginWithGoogle;
