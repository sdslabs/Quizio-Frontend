import React from 'react';

const ProfilePage = () => (
    <div>
        <ProfileCard />
    </div>
);

const ProfileCard = () => (
    <div className="relative h-52 w-6/12 shadow-lg rounded">
        <div className="flex flex-row">
            <div className="flex flex-col w-36">
                <div className="h-36 w-36 rounded-full">
                    <img src="./blackbird.jpg" alt="Profile" />
                </div>
                <div className="text-center text-purple-V6">
                    <a href="https://github.com/">Edit Details</a>
                </div>
            </div>
        </div>
    </div>
);
export default ProfilePage;

// {name, college, location, email, phoneNumber}
