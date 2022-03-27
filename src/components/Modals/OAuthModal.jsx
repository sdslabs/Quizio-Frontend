import React from 'react';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
// import LoginWithGithub from '@components/Buttons/LoginWithGithub';
import LoginWithGoogle from '@components/Buttons/LoginWithGoogle';
import { PropTypes } from 'prop-types';

const OAuthModal = ({ setShowModal }) => (
    <div className="">
        <div className="flex justify-between p-10 pb-4 pt-8">
            <div className="text-2xl text-purple-V6 font-bold">Join Us!</div>
            <CrossIcon className="m-2 cursor-pointer" onClick={() => { setShowModal(false); }} />
        </div>
        <div className="font-normal text-m pl-10 pr-10">To begin this journey, tell us via which platform you want to log in !</div>
        <div className="">
            {/* <LoginWithGithub /> */}
            <LoginWithGoogle />
        </div>
    </div>
);

OAuthModal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
};

export default OAuthModal;
