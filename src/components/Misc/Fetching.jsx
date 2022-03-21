import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@animations/fetching.json';

const Fetching = () => (
    <div className="w-full h-full flex justify-center items-center bg-white">
        <Lottie animationData={loadingAnimation} loop autoplay style={{ backgroundColor: '#FFFFFF' }} />
    </div>
);

export default Fetching;
