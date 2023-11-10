import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef } from "react";
import default_profile from "../assets/default_profile.png";
import { requestSignUp } from "../utils/axios";

const SignUp = () => {
  const location = useLocation();

  const [initialInfo, setInitialInfo] = useState({
    email: "",
    realName: "",
    job: "",
    password: "",
    university: null,
    nickname: "",
    age: "",
  });

  const handleChangeState = (e) => {
    setInitialInfo({
      ...initialInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [profileImg, setProfileImg] = useState(""); // profileImg : 서버로 보내는 사용자 지정 이미지
  const [previewImg, setPreviewImg] = useState(default_profile);
  const imgRef = useRef();
  // previewImg : 서버로 보내는 이미지가 아닌, 파일 첨부로부터 미리 보는 프로필 사진
  // 서버로 보내는 파일이랑 형식이 달라서 따로 지정

  const navigate = useNavigate();

  // 프로필 이미지 추가 버튼을 눌렀을 때 동작
  const handleProfileChange = () => {
    const imgFile = imgRef.current.files[0];
    if (imgFile) {
      setProfileImg(imgFile);
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };
    }
  };

  //프로필 삭제 버튼 눌렀을 때 동작
  const deleteProfile = () => {
    setPreviewImg(default_profile);
    setProfileImg(""); // 서버로 보내는 사진은 null
  };

  //회원가입 버튼 눌렀을 때 동작
  const handleSignUp = async () => {
    requestSignUp(initialInfo, profileImg, navigate);
  };

  return (
    <Container>
      <FormContainer>
        <ProfileContainer>
          <ProfileText>Profile Image</ProfileText>
          <ProfileImgView
            src={previewImg}
            alt="프로필 이미지"
          />
          <ProfileBtnContainer>
            <ProfileImgAdd htmlFor="profileImg">이미지 선택</ProfileImgAdd>
            <HiddenInput
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={handleProfileChange}
              ref={imgRef}
            />
            <ProfileDelete onClick={deleteProfile}>이미지 삭제</ProfileDelete>
          </ProfileBtnContainer>
        </ProfileContainer>

        <DivLine>
          <InputForm
            type="email"
            name="email"
            value={initialInfo.email}
            onChange={handleChangeState}
            placeholder="Email"
          />
        </DivLine>

        <DivLine>
          <InputForm
            type="text"
            name="realName"
            value={initialInfo.realName}
            onChange={handleChangeState}
            placeholder="Name"
          />
        </DivLine>

        <DivLine>
          <InputForm
            type="text"
            name="nickname"
            value={initialInfo.nickname}
            onChange={handleChangeState}
            placeholder="Nickname"
          />
        </DivLine>

        <DivLine>
          <InputForm
            type="text"
            name="age"
            value={initialInfo.age}
            onChange={handleChangeState}
            placeholder="Age"
          />
        </DivLine>

        <DivLine>
          <label>
            <label style={{ color: "#9c27b0" }}>Job : </label>
            <Select
              name="job"
              value={initialInfo.job}
              onChange={handleChangeState}
            >
              <option value="HIGHSCHOOL_STUDENT">고등학생</option>
              <option value="REPEAT_STUDENT(">재수생</option>
              <option value="UNIVERSITY_STUDENT">대학생</option>
              <option value="ETC">기타</option>
            </Select>
          </label>

          {initialInfo.job === "UNIVERSITY_STUDENT" && (
            <label style={{ color: "#9c27b0" }}>
              univ :
              <Select
                name="university"
                value={initialInfo.university}
                onChange={handleChangeState}
              >
                <option value="snu">서울대학교</option>
                <option value="khu">경희대학교</option>
                <option value="ysu">연세대학교</option>
                <option value="oku">고려대학교</option>
                <option value="sgu">서강대학교</option>
                <option value="skku">성균관대학교</option>
                <option value="hyu">한양대학교</option>
                <option value="cau">중앙대학교</option>
              </Select>
            </label>
          )}
        </DivLine>

        <DivLine>
          <InputForm
            type="password"
            name="password"
            value={initialInfo.password}
            onChange={handleChangeState}
            placeholder="Password"
          />
        </DivLine>

        <SignUpContainer>
          <SignUpBtn onClick={handleSignUp}>Sign Up</SignUpBtn>
        </SignUpContainer>
      </FormContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #9c27b0;
`;

const FormContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  background: #fff;
  width: 45vw;
  height: auto;
  overflow: auto;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(35, 35, 35, 0.1);

  &:hover {
    box-shadow: 0 1px 17px 0 rgba(141, 110, 99, 0.4), 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

const DivLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputForm = styled.input`
  margin-bottom: 20px;
  background-color: #e1bee7;
  font-size: 18px;
  border: none;
  border-radius: 7px;
  padding: 14px 15px;
  width: 60%;
  height: 50px;
  opacity: 0.7;

  &::placeholder {
    color: #9c27b0;
  }
`;

const ProfileContainer = styled.div`
  margin-top: 30px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImgView = styled.img`
  border-radius: 50%;
  width: 240px;
  height: 240px;
  border: 1.5px solid #fff;
`;

const ProfileBtnContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImgAdd = styled.label`
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  background: #1de9b6;
  height: 32px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background: #00bfa5;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProfileDelete = styled.label`
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  background: #ed4b82;
  height: 32px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    background: #c2185b;
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
`;

const SignUpBtn = styled.button`
  width: 15%;
  margin: 0 auto;
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

const ProfileText = styled.p`
  color: #9c27b0;
  font-weight: bold;
  font-size: 20px;
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #e1bee7;
  color: #9c27b0;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
  margin-right: 10px;
  margin-left: 10px;
  opacity: 0.7;
  width: 150px;

  &:hover,
  &:focus {
    border-color: #90caf9;
  }
`;
