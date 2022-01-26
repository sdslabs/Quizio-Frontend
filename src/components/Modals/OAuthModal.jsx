import React from 'react';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import LoginWithGithub from '@components/Buttons/LoginWithGithub';
import LoginWithGoogle from '@components/Buttons/LoginWithGoogle';

const OAuthModal = () => (
    <div className="">
        <div className="flex justify-between p-10 pb-4 pt-8">
            <div className="text-2xl text-purple-V6 font-bold">Join Us!</div>
            <CrossIcon className="m-2" />
        </div>
        <div className="font-normal text-m pl-10 pr-10">To begin this journey, tell us via which platform you want to log in !</div>
        <div className="">
            <LoginWithGithub />
            <LoginWithGoogle />
            <LoginWithGoogle />
        </div>
    </div>
);

export default OAuthModal;
