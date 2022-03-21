import React from 'react';
import PropTypes from 'prop-types';
import { uploadImage } from '@api/misc/uploadImage';
import FileUploader from './FileUploader';

const QuizBanner = ({ imageURL, setImageURL }) => {
  const handleFile = async (file) => {
    const image = new FormData();
    image.append('image', file);
    const fileURL = await uploadImage(image);
    if (fileURL.success) {
      setImageURL(fileURL.data.url);
    } else {
      setImageURL('');
    }
  };

  return (
      <div className="quiz-banner">
          <FileUploader handleFile={handleFile} currentImage={imageURL} />
      </div>
  );
};
QuizBanner.propTypes = {
  imageURL: PropTypes.string,
  setImageURL: PropTypes.func,
};

QuizBanner.defaultProps = {
  imageURL: '',
  setImageURL: () => {},
};

export default QuizBanner;
