import React from 'react';
import { falconURL, clientURL } from '@config/config';

const LoginWithSDSLabs = () => (
    <a href={`${falconURL}/login?redirect=${clientURL}`}>
        <button
          type="button"
          label="Continue with SDSLabs"
          className="bg-red-400"
        >
            Continue with SDSLabs
        </button>
    </a>
  );

export default LoginWithSDSLabs;
