import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);


  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.name}</strong> Profile
        </h3>
      </header>
      <p>
     
      </p>
      <p>
        <strong>Id:</strong> {currentUser._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Mobile:</strong> {currentUser.mobile}
      </p>
      <p>
        <strong>countory:</strong> {currentUser.countory}
      </p>
     
    </div>
  );
};

export default Profile;
