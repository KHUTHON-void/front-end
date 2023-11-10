import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "../components/Sidebar";
import { getProfileInfo } from "../utils/axios";
import { TierReader } from "../utils/TierReader";

const Profile = () => {
  const location = useLocation();
  const [cookies, setCookie] = useCookies();
  const token = cookies["jwt-token"];
  const [profileInfo, setProfileInfo] = useState({
    grade: "",
    profileImg: "",
    nickname: "",
  });
  // 초기 설정 (Mount시점에 API 호출)
  useEffect(() => {
    getProfileInfo(token, setProfileInfo, setCookie);
  }, []);

  const tier = TierReader(profileInfo.grade);

  return (
    <>
      <Header />
      <BodyContainer>
        <Sidebar />
        <ImgContainer>
          <ProfileImage src={profileInfo.profileImg}></ProfileImage>
          <Tier src={tier}></Tier>
        </ImgContainer>
        <NicknameDiv>{profileInfo.nickname}</NicknameDiv>
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

  margin-left: 220px;
  padding: 20px;
  height: 100vh;
`;

const ProfileImage = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 40px;

  box-shadow: 0px 6px 12px -6px #666;
`;

const Tier = styled.img`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;

  box-shadow: 0px 6px 12px -6px #666;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100vw;
  height: 60vh;
`;

const NicknameDiv = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
`;
