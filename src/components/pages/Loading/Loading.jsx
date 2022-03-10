import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@animations/loading.json';

const LoadingPage = () => (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
        <Lottie animationData={loadingAnimation} loop autoplay style={{ backgroundColor: '#FFFFFF' }} />
    </div>
);

export default LoadingPage;
