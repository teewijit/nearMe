import React from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  .profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    width: 300px;
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .profile-header img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .profile-header h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  .profile-body {
    display: flex;
    flex-direction: column;
  }

  .profile-body p {
    margin: 5px 0;
  }
`;

const Profile = ({ profilePicture, name, brithDay, sex, email }) => {
  return (
    <ProfileContainer>
      <div className="profile">
        <div className="profile-header">
          <img src={profilePicture} alt="profile pic" />
          <h2>{name}</h2>
        </div>
        <div className="profile-body">
          <p>Birth Day: {brithDay}</p>
          <p>sex: {sex}</p>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default Profile;
