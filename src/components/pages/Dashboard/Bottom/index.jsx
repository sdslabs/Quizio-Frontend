import React from 'react';

const index = () => (
    <div className="dashboard-bottom">
        <div className="pagination-container">
            <div className="pagination-active">
                Quizzes
            </div>
            <div className="pagination">
                Created Quizzes
            </div>
        </div>

        <div className="ongoing-quizzes">
            <div className="title">Ongoing Quizzes</div>
        </div>

        <div className="upcoming-quizzes">
            <div className="title">Upcoming Quizzes</div>
        </div>
    </div>
	);

export default index;
