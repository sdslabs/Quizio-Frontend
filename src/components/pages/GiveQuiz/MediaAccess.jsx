import React, { useEffect, useRef } from 'react'
import Proptypes from 'prop-types'
import log from '@utils/log'

const MediaAccess = ({ setIsMediaPermission, hidden }) => {
  const videoRef = useRef(null)

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        log('audio and video are available', {
          stream,
          audio: stream.getAudioTracks(),
          video: stream.getVideoTracks(),
        })
        const video = videoRef.current
        video.srcObject = stream
        video.play()

        // disable audio
        stream.getAudioTracks().forEach((audioTrack) => audioTrack.stop())

        setIsMediaPermission(true)
      })
      .catch((err) => {
        setIsMediaPermission(false)
        log('Error getting camera and microphone permission:', err)
      })
  }

  useEffect(() => {
    getVideo()
  }, [videoRef])

  return (
    <div
      className={`flex flex-col w-full h-screen justify-center items-center ${
        hidden ? 'hidden' : ''
      }`}
    >
      <video
        ref={videoRef}
        className={`${hidden ? 'hidden' : ''}`}
        style={{ transform: 'rotateY(180deg)' }}
      />
      <div className='font-bold text-xl pt-8'>
        You must be clearly visible in the video above (Video Proctoring)
      </div>
    </div>
  )
}

MediaAccess.propTypes = {
  setIsMediaPermission: Proptypes.func.isRequired,
  hidden: Proptypes.bool,
}

MediaAccess.defaultProps = {
  hidden: true,
}

export default MediaAccess
