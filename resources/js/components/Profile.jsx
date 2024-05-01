// Profile.jsx

import React from 'react';

const Profile = ({ user }) => {
  if (!user){
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
     
    </div>
  );
};

export default Profile;
