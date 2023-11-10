import React from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../assets/close_gray.svg";
import { ReactComponent as ImagesIcon } from "../assets/images.svg";
import { useState, useRef } from "react";
import { getAskPostList, uploadAskPost } from "../utils/axios";
import { useCookies } from "react-cookie";

const WriteAskModal = ({ setIsModalOpen, name, profileImg }) => {
  const [cookies, setCookie] = useCookies();
  const token = cookies["jwt-token"];
  const [askImg, setAskImg] = useState("");
  const imgRef = useRef();
  const placeholder = `${name}님, 어떤 것을 질문 하실래요?`;
  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
  };
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleChangeState = (e) => {
    setPostInfo({
      ...postInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleImgChange = () => {
    const imgFile = imgRef.current.files[0];
    if (imgFile) {
      setAskImg(imgFile);
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onloadend = () => {};
    }
  };

  const handlePostAsk = async () => {
    console.log(askImg, postInfo);
    uploadAskPost(postInfo, askImg, setIsModalOpen, token);
  };

  return (
    <>
      <ModalBackground>
        <ModalOutlay>
          <CloseIcon
            className="close-button"
            onClick={() => handleModalClose()}
          />
          <ModalHeader>
            <ProfileImg src={profileImg} />
            <Name>{name}</Name>
          </ModalHeader>
          <ModalInner>
            <AddImageBar>
              <AddImageIcon>
                <ImageInput
                  accept="image/*"
                  type="file"
                  onChange={handleImgChange}
                  ref={imgRef}
                  id="askImg"
                />
                <ImagesIcon />
              </AddImageIcon>
            </AddImageBar>
            <CategoryContainer>
              <Title
                type="text"
                name="title"
                value={postInfo.title}
                placeholder="Title"
                onChange={handleChangeState}
              />
              <label style={{ color: "#9c27b0" }}>
                category :
                <Select
                  name="category"
                  value={postInfo.category}
                  onChange={handleChangeState}
                >
                  <option value="KOREAN">국어</option>
                  <option value="ENGLISH">영어</option>
                  <option value="MATH">수학</option>
                  <option value="ENGINEERING">공학</option>
                  <option value="IT">IT</option>
                  <option value="LANGUAGE">어학</option>
                  <option value="EXAM">고시</option>
                  <option value="JOBSEARCHING">취업</option>
                  <option value="ETC">기타</option>
                </Select>
              </label>
            </CategoryContainer>
            <PostContent
              type="text"
              name="content"
              value={postInfo.content}
              placeholder={placeholder}
              onChange={handleChangeState}
            />
          </ModalInner>
          <ModalFooter>
            <SubmitButton onClick={handlePostAsk}>게시물 올리기</SubmitButton>
          </ModalFooter>
        </ModalOutlay>
      </ModalBackground>
    </>
  );
};

export default WriteAskModal;

const ModalBackground = styled.div`
  display: flex;
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(139, 139, 139, 0.2);
  backdrop-filter: blur(15px);
  z-index: 999;
  overflow: hidden;
  transition: 0.5s;
`;

const ModalOutlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 764px;
  height: 80vh;
  background: #ffffff;
  border: 1px solid #fafafa;
  box-sizing: border-box;
  border-radius: 10px;
  .close-button {
    position: absolute;
    top: 33px;
    left: 712px;
    color: #8b8b8b;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  margin: 40px 45px 0px 45px;
  height: 30px;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-left: 8px;
`;

const ModalInner = styled.div`
  margin: 18px 45px 0px 45px;
`;

const AddImageBar = styled.div`
  display: flex;
  margin-left: 25px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 18px;
  width: 10%;
  height: 30px;
  background: #f3e5f5;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ImageInput = styled.input`
  display: none;
`;

const AddImageIcon = styled.label`
  cursor: pointer;
  padding-top: 4px;
`;

const PostContent = styled.textarea`
  width: 634px;
  height: 250px;
  margin: 10px 20px 0px 20px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  color: #313338;
  padding: 20px;
  border-radius: 7px;
  border: 3px solid #f3e5f5;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #f3e5f5;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 56px 0px 45px 0px;
`;

const SubmitButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 48px;
  background: #8e24aa;
  border-radius: 30px;
  color: #ffffff;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 16px;
  cursor: pointer;
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f3e5f5;
  color: #9c27b0;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
  margin-right: 10px;
  margin-left: 10px;
  opacity: 0.7;
  width: 100px;

  &:hover,
  &:focus {
    border-color: #90caf9;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Title = styled.input`
  margin-bottom: 20px;
  margin-right: 30px;
  background-color: #f3e5f5;
  font-size: 18px;
  border: none;
  border-radius: 7px;
  padding: 10px;
  width: 60%;
  height: 50px;
  opacity: 0.7;

  &::placeholder {
    color: #9c27b0;
  }
`;
