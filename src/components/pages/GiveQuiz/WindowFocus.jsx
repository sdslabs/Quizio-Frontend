import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import log from '@utils/log';

const WindowFocus = ({ handleBlurred }) => {
  // User has switched back to the tab
  const onFocus = () => {
    log('Tab is in focus');
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    log('Tab is blurred');
	handleBlurred();
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return <></>;
};

WindowFocus.propTypes = {
	handleBlurred: Proptypes.func.isRequired,
};

export default WindowFocus;
