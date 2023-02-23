import React, { useState } from 'react';
import CreatedQuizzes from './CreatedQuizzes';
import Quizzes from './Quizzes';
import '@pagestyles/dashboard/bottom.scss';
import { useSelector } from 'react-redux';
const index = () => {
  const [showCreated, setShowCreated] = useState(false)
  const user = useSelector((state) => state.auth.user);

  const handleShowCreated = () => {
    setShowCreated(true);
  };

  const handleShowQuizzes = () => {
    setShowCreated(false);
  };

  return (
      <div className="dashboard-bottom">
          <div className="pagination-container">
              <button
                type="button"
                onClick={handleShowQuizzes}
                className={`quizzes ${!showCreated && 'active'}`}
              >
                  Quizzes
              </button>
              {user.role!="public"&&<button
                type="button"
                onClick={handleShowCreated}
                className={`created-quizzes ${showCreated && 'active'}`}
              >
                  Created Quizzes
              </button>}
              <div className="pagination-border" />
          </div>
          <div className="main">
              {user.role!="public"? (showCreated ? <CreatedQuizzes /> : <Quizzes/>) : <Quizzes/>}
          </div>
      </div>
  );
};
export default index;

