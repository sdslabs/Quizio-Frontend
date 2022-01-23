import React, { useState } from 'react';
import Dashboard from '@pages/Dashboard';
import JoinUs from '@pages/JoinUs';
// import { checkAuth } from '@api/auth';
// import { useDispatch } from 'react-redux';
// import { setUser } from '@redux/actions/auth';
import MarkdownTextField from '@components/Input/MarkdownTextField';

function Landing() {
  // const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(async () => {
  //   // try to login using existing jwt Token
  //   const checkAuthRes = await checkAuth();
  //   if (checkAuthRes.success) {
  //     dispatch(setUser(checkAuthRes.data.user));
  //     setIsLoggedIn(true);
  //   } else {
  //     dispatch(setUser({}));
  //     setIsLoggedIn(false);
  //   }
  //   setIsLoading(false);
  // }, []);

  const [example, setExample] = useState('');
  const isLoading = true;
  const isLoggedIn = false;
  return (
      <>
          {isLoading ? (
              <MarkdownTextField
                id="quiz name"
                placeholder="Enter quiz name"
                label="Quiz Name"
                error=""
                limit={100}
                val={example}
                setVal={setExample}
              />
      ) : (
          <>{isLoggedIn ? <Dashboard /> : <JoinUs />}</>
      )}
      </>
  );
}
export default Landing;
