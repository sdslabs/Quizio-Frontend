// import React, { useCallback, useEffect } from 'react';
import React, { useEffect } from 'react';
import { susKeysAscii } from '@config/config';

const LogsTest = () => {
    const handleTabChange = () => {
        console.log('tab change!!!');
    };
    const handleKeyDown = (event) => {
        event.preventDefault();
        if (susKeysAscii.includes(event.keyCode)) {
          console.log('keydown!!!');
                      // let s = '';
            // susKeys.forEach((x) => {
            //     s += `, '${x}'`;
            // });
            // alert('Your action has been logged. Following keys are not allowed' + s);
        }
    };

  // const handleContextMenu = useCallback((event) => {
  //   console.log('right click!!!!s');
  //   event.preventDefault();
  //   console.log('right click!!!!s');
  // });
    const handleContextMenu = (event) => {
      event.preventDefault();
      console.log('rightclick!!!');
    };

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('visibilitychange', handleTabChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('visibilitychange', handleTabChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

    return (
        <div>
            Logs testing!!
        </div>
    );
};
export default LogsTest;
