import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const location = useLocation();
  /*
  const [profileInfo, setProfileInfo] = useState({
    grade: location.state.grade,
    profileImg: location.state.profileImg,
    nickname: location.state.nickname,
  });
  */
  return (
    <>
      <Header />
      <BodyContainer>
        <Sidebar></Sidebar>
        <ProfileImage></ProfileImage>
      </BodyContainer>
      <Footer />
    </>
  );
};

export default Profile;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #9c27b0;

  padding: 20px;
  width: 100vw;
  height: 100vh;
`;

const ProfileImage = styled.image``;
