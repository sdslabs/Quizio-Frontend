import React, { } from 'react';
// import { Logout } from '@api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@redux/actions/auth';
import Cookies from 'js-cookie';

const Home = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		Cookies.remove('token');
		Cookies.remove('username');
		dispatch(logout());
	};

	return (
    <>
        <div className="flex flex-col text-center">
            <div>Hi</div>
            {' '}
            <div>
                {user.username}
                !
            </div>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </div>

    </>
	);
};

Home.propTypes = {

};

Home.defaultProps = {

};
export default Home;
