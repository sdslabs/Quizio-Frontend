import React from 'react';
import { falconURL } from '@config/config';

const LoginWithSDSLabs = () => (
	<a href={`${falconURL}/login?redirect=${window.location.href}`}>
		<button type="button" label="Continue with SDSLabs" className="bg-red-400">
			Continue with SDSLabs
		</button>
	</a>
);

export default LoginWithSDSLabs;
