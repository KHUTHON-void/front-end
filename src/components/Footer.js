import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #fff;
  color: #000;
  padding: 10px;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 khuthon - void</p>
    </FooterContainer>
  );
};

export default Footer;