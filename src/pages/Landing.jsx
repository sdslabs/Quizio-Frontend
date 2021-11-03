import React from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

function Landing() {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);
	return (
		<div className="flex flex-col items-center space-y-10">
			{isLoggedIn && user ? (
				<div className="flex text-center">
					Hi
					{' '}
					{user.username}
					!
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
