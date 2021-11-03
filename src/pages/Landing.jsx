import React, { useEffect } from 'react';
import LoginWithGoogle from '../components/Buttons/LoginWithGoogle';
// import openInNewTab from '../utils/openInNewTab';

function Landing() {
  //   const [count, setCount] = useState(0);
  useEffect(() => {

  });

  return (
    <div>
      <div className="flex text-center">Welcome to Quizio!</div>
      <LoginWithGoogle />
    </div>
  );
}
export default Landing;
