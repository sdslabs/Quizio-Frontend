/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import Proptypes from 'prop-types';
import log from '@utils/log';

const MediaAccess = ({ setIsMediaPermission }) => {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        log('audio and video are available');
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
        setIsMediaPermission(true);
      })
      .catch((err) => {
        setIsMediaPermission(false);
        log('Error getting camera and microphone permission:', err);
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

MediaAccess.propTypes = {
  setIsMediaPermission: Proptypes.func.isRequired,
};

export default MediaAccess;
