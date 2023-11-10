import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../assets/close_gray.svg";
import PostEditor from './PostEditor';
import { uploadPost } from '../utils/axios';
import Filtering from './Filtering';

const POST_IS_EMPTY = "<p><br></p>"

const WriteRecruitModal = ({ setIsModalOpen, name, token}) => {
  const ref = useRef(null);
  const [title, setTitle] = useState("")
  const [activeFilter, setActiveFilter] = useState(null);

  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    setIsModalOpen(false);
  };
  const handleSubmit = () => {
    try{
      const editorlns = ref?.current?.getInstance();
      const content = editorlns.getHTML();
      const postData = {
        "title" : title,
        "content" : content,
        "category" : activeFilter,
      }
    if (content === POST_IS_EMPTY) {
      alert('내용을 입력해주세요');
      return
    }
    uploadPost(token, postData, setIsModalOpen);
  } catch (e) {
    console.log(e);
    alert('다시 시도해주세요');
    return
  }
  setIsModalOpen(false);
  }

  return (
    <>
      <ModalBackground>
        <ModalOutlay>
          <CloseIcon
            className="close-button"
            onClick={() => handleModalClose()}
          />
          <ModalHeader>
            <ProfileImg />
            <Name>{name}</Name>
          </ModalHeader>
          <ModalInner>
          <FilterBody>
      <FilterButton
        filter="KOREAN"
        isActive={activeFilter === "KOREAN"}
        onClick={() => setActiveFilter("KOREAN")}
      >
        국어
      </FilterButton>
      <FilterButton
        filter="ENGLISH"
        isActive={activeFilter === "ENGLISH"}
        onClick={() => setActiveFilter("ENGLISH")}
      >
        영어
      </FilterButton>
      <FilterButton
        filter="MATH"
        isActive={activeFilter === "MATH"}
        onClick={() => setActiveFilter("MATH")}
      >
        수학
      </FilterButton>
      <FilterButton
        filter="IT"
        isActive={activeFilter === "IT"}
        onClick={() => setActiveFilter("IT")}
      >
        IT
      </FilterButton>
      <FilterButton
        filter="LANGUAGE"
        isActive={activeFilter === "LANGUAGE"}
        onClick={() => setActiveFilter("LANGUAGE")}
      >
        어학
      </FilterButton>
      <FilterButton
        filter="ENGINEERING"
        isActive={activeFilter === "ENGINEERING"}
        onClick={() => setActiveFilter("ENGINEERING")}
      >
        공학
      </FilterButton>
      <FilterButton
        filter="EXAM"
        isActive={activeFilter === "EXAM"}
        onClick={() => setActiveFilter("EXAM")}
      >
        고시
      </FilterButton>
      <FilterButton
        filter="JOBSEARCHING"
        isActive={activeFilter === "JOBSEARCHING"}
        onClick={() => setActiveFilter("JOBSEARCHING")}
      >
        취업
      </FilterButton>
      <FilterButton
        filter="ETC"
        isActive={activeFilter === "ETC"}
        onClick={() => setActiveFilter("ETC")}
      >
        기타
      </FilterButton>
          </FilterBody>
            <PostTitle value={title} placeholder="제목을 입력해주세요" onChange={(e) => {setTitle(e.currentTarget.value)}}></PostTitle>
            <PostEditor editorRef={ref}/>
          </ModalInner>
          <ModalFooter>
            <SubmitButton onClick={() => handleSubmit()}>게시물 올리기</SubmitButton>
          </ModalFooter>
        </ModalOutlay>
      </ModalBackground>
    </>
  );
};

export default WriteRecruitModal;

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
  transition: .5s;
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

const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background: #d2d2d2;
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

const FilterBody = styled.div`
  height: 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterButton = styled.button`
  background-color: ${({ isActive }) => (isActive ? "#4a148c" : "#f3e5f5")};
  color: ${({ isActive }) => (isActive ? "#f3e5f5" : "#4a148c")};
  padding: 10px;
  margin: 0 10px;
  border: none;
  width: 80px;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};

  &:hover,
  &:focus {
    background-color: #4a148c;
    color: #f3e5f5;
    font-weight: bold;
  }
`;

const PostTitle = styled.input`
  width: 670px;
  outline: none;
  border: none;
  background: #fafafa;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 45px 0px;
`;

const SubmitButton = styled.button`
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
