import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { requestSignIn } from "../utils/axios";

const SignIn = () => {
  const location = useLocation();

  const [signInInfo, setInitialInfo] = useState({
    email: "",
    password: "",
  });

  const handleChangeState = (e) => {
    setInitialInfo({
      ...signInInfo,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  //로그인 버튼 눌렀을 때 동작
  const handleSignIn = async () => {
    requestSignIn(signInInfo, navigate);
  };

  return (
    <Container>
      <FormContainer>
        <InputForm
          type="email"
          name="email"
          value={signInInfo.email}
          onChange={handleChangeState}
          placeholder="Email"
        />

        <InputForm
          type="password"
          name="password"
          value={signInInfo.password}
          onChange={handleChangeState}
          placeholder="Password"
        />

        <SignInBtn onClick={handleSignIn}>Sign In</SignInBtn>
      </FormContainer>
    </Container>
  );
};

export default SignIn;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #9c27b0;
`;

const FormContainer = styled.div`
  background: #fff;
  width: 45%;
  height: 35%;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 1px 17px 0 rgba(141, 110, 99, 0.4), 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

const InputForm = styled.input`
  margin-bottom: 20px;
  background-color: #e1bee7;
  font-size: 18px;
  border: none;
  border-radius: 7px;
  padding: 14px 15px;
  width: 50%;
  height: 50px;
  opacity: 0.7;

  &::placeholder {
    color: #9c27b0;
  }
`;

const SignInBtn = styled.button`
  width: 15%;
  margin-top: 45px;
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
