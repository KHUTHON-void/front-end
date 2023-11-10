// Sidebar.js

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/recruit">모집 게시판</SidebarLink>
      <SidebarLink to="/ask">질문 게시판</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  height: 100%;
  width: 220px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ab47bc;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  padding-top: 40px;
`;

const SidebarLink = styled(Link)`
  display: block;
  margin-bottom: 15px;
  color: #fff;
  padding: 15px;
  text-decoration: none;
  text-align: center;
  font-size: large;

  &:hover {
    background-color: #f3e5f5;
    color: #9c27b0;
    font-size: x-large;
    font-weight: bold;
  }
`;
