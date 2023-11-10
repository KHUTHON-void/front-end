import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import khu_logo from "../assets/khu_logo.png";

export const LandHeader = () => {
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("signup");
  };
  const navigateToSignIn = () => {
    navigate("signin");
  };
  return (
    <HeaderContainer>
      <SignBtn onClick={navigateToSignUp}>SIGN UP</SignBtn>
      <SignBtn onClick={navigateToSignIn}>SIGN IN</SignBtn>
    </HeaderContainer>
  );
};

export const Header = () => {
  return (
    <HeaderContainer>
      <UnivLogo src={khu_logo} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #fff;
  color: #000;
  padding: 10px;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const SignBtn = styled.button`
  width: 8%;
  margin-left: 10px;
  height: 40px;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  background: #ce93d8;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background: #8e24aa;
  }
`;

const UnivLogo = styled.img`
  border-radius: 50%;
  overflow: hidden;
  width: 60px;
  height: 60px;
  box-shadow: 0px 6px 12px -6px #666;
`;
