import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "../components/Sidebar";
import { getProfileInfo } from "../utils/axios";

const Profile = () => {
  const location = useLocation();
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const [profileInfo, setProfileInfo] = useState({
    grade: "",
    profileImg: "",
    nickname: "",
  });
  // 초기 설정 (Mount시점에 API 호출)
  useEffect(() => {
    getProfileInfo(token, setProfileInfo);
  }, []);

  return (
    <>
      <Header />
      <BodyContainer>
        <Sidebar />
        <ProfileImage src={profileInfo.profileImg}></ProfileImage>
        <div>{profileInfo.grade}</div>
        <div>{profileInfo.nickname}</div>
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

const ProfileImage = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  overflow: hidden;

  box-shadow: 0px 6px 12px -6px #666;
`;
