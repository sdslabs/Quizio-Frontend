// import { Logout } from '@api/auth';
import { logout } from '@redux/actions/auth';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

function Landing() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		Cookies.remove('token');
		Cookies.remove('username');
		dispatch(logout());
	};
	return (
		<div className="flex flex-col items-center space-y-10">
			{isLoggedIn && user ? (
				<div className="flex text-center">
					<div>Hi</div>
					{' '}
					<div>
						{user.username}
						!
					</div>
					<button type="button" onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					<div>Not logged In</div>
					<a href="/#/login">Join Us</a>
				</div>
			)}
		</div>
	);
}
export default Landing;
