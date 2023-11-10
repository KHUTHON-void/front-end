import React from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../assets/close_gray.svg";
import { ReactComponent as ImagesIcon } from "../assets/images.svg";

const WriteAskModal = ({ setIsModalOpen, name, profileImg }) => {
  const placeholder = `${name}님, 어떤 것을 질문 하실래요?`;
  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
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
                <ImageInput type="file" />
                <ImagesIcon />
              </AddImageIcon>
            </AddImageBar>
            <PostContent placeholder={placeholder} />
          </ModalInner>
          <ModalFooter>
            <SubmitButton>게시물 올리기</SubmitButton>
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 18px;
  width: 638px;
  height: 30px;
  background: #f3e5f5;
  border-radius: 10px;
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
  height: 308px;
  margin: 40px 20px 0px 20px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 18px;
  color: #313338;
  border: none;
  resize: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #d2d2d2;
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
