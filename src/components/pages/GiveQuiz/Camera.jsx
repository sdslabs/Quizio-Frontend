/* eslint-disable jsx-a11y/media-has-caption */
import React, { Fragment, useEffect, useRef } from 'react';

const Camera = () => {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);
  return (
      <>
          <video ref={videoRef} hidden />
      </>
);
};

export default Camera;
