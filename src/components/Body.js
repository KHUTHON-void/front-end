import React from "react";
import styled from "styled-components";
import { ReactComponent as MainLogo } from "../assets/G-R.svg";
import { ReactComponent as MainText } from "../assets/text.svg";

const BodyContainer = styled.div`
  background: #9c27b0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  height: 100vh;
  width: 100vw;
`;

const Body = () => {
  return (
    <>
      <BodyContainer>
        <MainLogo fill="#ffffff" />
        <MainText />
      </BodyContainer>
    </>
  );
};

export default Body;
