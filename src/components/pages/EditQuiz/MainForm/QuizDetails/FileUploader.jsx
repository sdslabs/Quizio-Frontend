import React from 'react';
import Proptypes from 'prop-types';
import bannerUploadImg from '@images/QuizUploadBanner.png';

const FileUploader = ({ handleFile, currentImage }) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => hiddenFileInput.current.click();

  const handleChange = (event) => handleFile(event.target.files[0]);

  return (
      <>
          <button type="button" onClick={handleClick}>
              <img src={currentImage || bannerUploadImg} alt="" />
          </button>
          <input
            type="file"
            accept="images/*"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
          />
      </>
  );
};

FileUploader.propTypes = {
  handleFile: Proptypes.func.isRequired,
  currentImage: Proptypes.string,
};

FileUploader.defaultProps = {
  currentImage: bannerUploadImg,
};

export default FileUploader;
