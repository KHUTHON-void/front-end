import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #fff;
  color: #000;
  padding: 10px;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>void</h1>
    </HeaderContainer>
  );
};

export default Header;
