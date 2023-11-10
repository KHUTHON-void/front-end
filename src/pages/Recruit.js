import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { bookmarkPost, getPostDetail, getPostList } from '../utils/axios'
import { ReactComponent as BookmarkIcon } from "../assets/flag.svg";
import { ReactComponent as WriteIcon } from "../assets/pen.svg"
import { useNavigate } from 'react-router-dom'
import WriteRecruitModal from '../components/WriteRecruitModal'


const Recruit = () => {
  const navigate = useNavigate();
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
  getPostList();
});

  return (
    <>
      <Header />
      <WritePostButton onClick={handleModalOpen} >
            <WriteIcon fill="white" width="40px" />
      </WritePostButton>
      <BodyContainer>
        <Sidebar></Sidebar>
        <DiaryListContainer>
          {searchedList ? (searchedList.map((diary) => (
            <DiaryBlock key={diary.id}>
              <DiaryHeader onClick={() => {getPostDetail(diary.diaryId, navigate)}}>
                <ThumbnailBox>
                  {diary.thumbnailImgURL ? <ThumbnailImg src={`${STATIC_URL + diary.thumbnailImgURL}`} alt="Thumbnail"/> : <EmptyThumbnailImg alt="EmptyThumbnail" />}
                </ThumbnailBox>
                <Title>{diary.title}</Title>
              </DiaryHeader>
              <DiaryBody onClick={() => {getPostDetail(diary.diaryId, navigate)}}>
                <AuthorBlock>
                  <AuthorProfileImg src={`${STATIC_URL + diary.member.profileImgURL}`} />
                  <Author>{diary.member.name}</Author>
                </AuthorBlock>
                <DiaryInfoBlock>
                  <ViewCount>조회수 {diary.viewCount}</ViewCount>
                  <LikeCount>👍 {diary.likeCount}</LikeCount>
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
              name="김수한무거북이"
            />
          )}
    </>
  )
}

export default Recruit

const WritePostButton = styled.div`
  right: 10vw;
  bottom: 10vh;
  position : absolute;
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
  text-align: center;
`;

const DiaryBlock = styled.div`
  width: 800px;
  margin: auto;
  border-radius: 5px;
  border: 1px solid #8b8b8b;
  background: #ffffff;
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

const Title = styled.div``;

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

const Author = styled.div``;
const DiaryInfoBlock = styled.div`
  display: flex;
  justify-content: right;
`;

const ViewCount = styled.div`

`;

const LikeCount = styled.div`
  padding: 0 10px;
`;

const CommentCount = styled.div`
  padding: 0 10px;
`;