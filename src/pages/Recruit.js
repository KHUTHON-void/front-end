import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { bookmarkPost, getPostDetail, getPostList } from '../utils/axios'
import { ReactComponent as BookmarkIcon } from "../assets/flag.svg";
import { ReactComponent as WriteIcon } from "../assets/pen.svg"
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import WriteRecruitModal from '../components/WriteRecruitModal'
import { DiaryList } from '../store/fakeData'
import Filtering from '../components/Filtering'

const Recruit = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const token = cookies["jwt-token"];
  const grade = cookies["grade"];
  const nickname = cookies["nickname"];
  const profileImg = cookies["profileImg"];
  const STATIC_URL = "https://void-team.kro.kr/api"
  const [postList, setPostList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchContent, setsearchContent] = useState('')
  const searchedList = searchContent === "" ? postList : postList.filter((post) =>
    post.title.toLowerCase().includes(searchContent.toLowerCase()) === true
  )

const handleModalOpen = () => {
  document.body.style.overflow = "hidden";
  setIsModalOpen(true);
};

const handleSearch = (e) => {
  const newValue = e.currentTarget.value;
  setsearchContent(newValue);
}

useEffect(() => {
  getPostList(token, setPostList);
}, []);

  return (
    <>
      <Header />
      <WritePostButton onClick={handleModalOpen} >
            <WriteIcon fill="white" width="40px" />
      </WritePostButton>
      <BodyContainer>
        <Sidebar></Sidebar>
        <DiaryListContainer>
        <Filtering />
          {searchedList ? (searchedList.map((diary) => (
            <DiaryBlock key={diary.recruitId}>
              <DiaryHeader onClick={() => {getPostDetail(token, diary.recruitId, navigate)}}>
                <ThumbnailBox>
                  {diary.thumbnailImgURL ? <ThumbnailImg src={`${STATIC_URL + diary.thumbnailImgURL}`} alt="Thumbnail"/> : <EmptyThumbnailImg alt="EmptyThumbnail" />}
                </ThumbnailBox>
                <Title>{diary.title}</Title>
              </DiaryHeader>
              <DiaryBody onClick={() => {getPostDetail(token, diary.recruitId, navigate)}}>
                <AuthorBlock>
                  <AuthorProfileImg src={`${diary.member.profileImgURL}`} />
                  <Author>{diary.member.nickname}</Author>
                </AuthorBlock>
                <DiaryInfoBlock>
                  <ViewCount>조회수 {diary.viewCount}</ViewCount>
                  <CommentCount>댓글 {diary.commentCount}</CommentCount>
                </DiaryInfoBlock>
              </DiaryBody>
              <BookmarkIcon
                  onClick={() => bookmarkPost(diary.diaryId)}
                  className={diary.isBookmarked ? "Bookmarked Icon" : "Icon"}
              />
              </DiaryBlock>
            ))): "Loading"}
          </DiaryListContainer>
      </BodyContainer>
      <Footer />
      {isModalOpen && (
            <WriteRecruitModal
              setIsModalOpen={setIsModalOpen}
              name={nickname}
              profileImg={profileImg}
              token={token}
            />
          )}
    </>
  )
}

export default Recruit

const WritePostButton = styled.div`
  right: 10vw;
  bottom: 10vh;
  position : fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  background: #8e24aa;
  border-radius: 100px;
  margin-left: 34px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

const BodyContainer = styled.div`
  background: #ffffff;
`;

const DiaryListContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DiaryBlock = styled.div`
  width: 800px;
  border-radius: 10px;
  background: #f3e5f5;
  position: relative;
  margin-bottom: 20px;
  .Icon {
    position: absolute;
    top: -5px;
    right: 10px;
    z-index: 0;
    fill: #9b9b9b;
  }
  .Bookmarked {
    fill: #7054ff;
  }
`;

const DiaryHeader = styled.div`
  display: flex;
  align-items: center;
`;

const DiaryBody = styled.div`
  display: flex;
  justify-content: right;
`;

const Title = styled.div`
  color: #8e24aa;
`;

const ThumbnailBox = styled.div`
  width: 64px;
  height: 64px;
  background: #f1f1f1;
  margin: 10px;
`;

const ThumbnailImg = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
`;

const EmptyThumbnailImg = styled.div`
  width: 64px;
  height: 64px;
  background: #f1f1f1
`;

const AuthorBlock = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  
`;

const AuthorProfileImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 100px;
`;

const Author = styled.div`
  color: #8e24aa;
`;
const DiaryInfoBlock = styled.div`
  display: flex;
  justify-content: right;
  color: #8e24aa;
`;

const ViewCount = styled.div`
  color: #8e24aa;
`;

const LikeCount = styled.div`
  padding: 0 10px;
`;

const CommentCount = styled.div`
  padding: 0 10px;
  color: #8e24aa;
`;