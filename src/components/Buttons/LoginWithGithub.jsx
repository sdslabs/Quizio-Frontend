import React from 'react';
import { baseURL } from '../../config/config';

const LoginWithGithub = () => (
	<a href={`${baseURL}/auth/github`}>
		<button type="button" label="Continue with Github" className="bg-red-400">
			Continue with Github
		</button>
	</a>
);

export default LoginWithGithub;
