import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Login } from '@api/auth';
import { useDispatch } from 'react-redux';
import LoginWithGoogle from '@components/Buttons/LoginWithGoogle';
import LoginWithGithub from '@components/Buttons/LoginWithGithub';
import { setJwtToken, setUser } from '../redux/actions/auth';

function Landing() {
	const { search } = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(async () => {
		const queryUsername = new URLSearchParams(search).get('username');
		const queryToken = new URLSearchParams(search).get('token');
		const cookieToken = Cookies.get().token;
		const cookieUsername = Cookies.get().username;

		// Try to login using the query params (must be done first)
		Cookies.set('username', queryUsername);
		Cookies.set('token', queryToken);

		let data = await Login(queryUsername);
		console.log('query params login: ', data);
		if (data) {
			dispatch(setUser(data.user));
			dispatch(setJwtToken(data.token));
			history.push('/');
		} else {
			// login using the old token stored in cookie
			Cookies.set('username', cookieUsername);
			Cookies.set('token', cookieToken);
			data = await Login(cookieUsername);
			console.log('cookies login: ', data);
			if (data) {
				dispatch(setJwtToken(data.token));
				dispatch(setUser(data));
				history.push('/');
			} else {
				console.log('User not logged in.');
				dispatch(setJwtToken(''));
				dispatch(setUser(null));
			}
		}
	});

	return (
		<div className="flex flex-col items-center space-y-10">
			<div className="flex text-center">Welcome to Quizio!</div>
			<LoginWithGoogle />
			<LoginWithGithub />
		</div>
	);
}
export default Landing;
