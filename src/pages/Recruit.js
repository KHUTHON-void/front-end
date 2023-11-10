import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { bookmarkPost, getPostDetail, getPostList } from "../utils/axios";
import { ReactComponent as BookmarkIcon } from "../assets/flag.svg";
import { ReactComponent as WriteIcon } from "../assets/pen.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import WriteRecruitModal from "../components/WriteRecruitModal";
import { DiaryList } from "../store/fakeData";
import Filtering from "../components/Filtering";
import SearchBar from "../components/SearchBar";

const Recruit = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [activeFilter, setActiveFilter] = useState(null);
  const token = cookies["jwt-token"];
  const grade = cookies["grade"];
  const nickname = cookies["nickname"];
  const profileImg = cookies["profileImg"];
  const STATIC_URL = "https://void-team.kro.kr/api";
  const [postList, setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchContent, setsearchContent] = useState("");
  const searchedList =
    searchContent === ""
      ? postList
      : postList.filter(
          (post) => post.title.toLowerCase().includes(searchContent.toLowerCase()) === true
        );

  const handleModalOpen = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    const newValue = e.currentTarget.value;
    setsearchContent(newValue);
  };

  useEffect(() => {
    getPostList(token, setPostList);
  }, []);

  return (
    <>
      <Header />
      <WritePostButton onClick={handleModalOpen}>
        <WriteIcon
          fill="white"
          width="40px"
        />
      </WritePostButton>
      <BodyContainer>
        <Sidebar></Sidebar>
        <SearchBarContainer>
          <SearchBar
            width="600px"
            height="44px"
            fontSize="21px"
            placeholder="검색할 내용을 입력하세요"
            value={searchContent}
            onChange={handleSearch}
          />
        </SearchBarContainer>

        <Filtering
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <DiaryListContainer>
          {searchedList
            ? searchedList.map((post) => (
                <PostBlock key={post.boardId}>
                  <PostHeader
                    onClick={() => {
                      getPostDetail(post.boardId, token, navigate);
                    }}
                  >
                    <ThumbnailBox>
                      {post.member.profileImg ? (
                        <ThumbnailImg
                          src={post.member.profileImg}
                          alt="Thumbnail"
                        />
                      ) : (
                        <EmptyThumbnailImg alt="EmptyThumbnail" />
                      )}
                    </ThumbnailBox>
                    <Title>{post.title}</Title>
                    <Author>{post.member.nickname}</Author>
                  </PostHeader>
                  <ViewCount>조회수 : {post.viewCount}</ViewCount>
                </PostBlock>
              ))
            : "Loading"}
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
  );
};

export default Recruit;

const WritePostButton = styled.div`
  right: 10vw;
  bottom: 10vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  background: #8e24aa;
  border-radius: 100px;
  margin-left: 34px;
  cursor: pointer;
  z-index: 999;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

const BodyContainer = styled.div`
  background: #ffffff;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 220px;
`;

const DiaryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 220px;
  margin-top: 30px;
  padding-bottom: 400px;
`;

const PostBlock = styled.div`
  padding: 20px;
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
    fill: #9c27b0;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  color: #7b1fa2;
`;

const Author = styled.div`
  color: #ba68c8;
  position: absolute;
  right: 0;
  margin-right: 20px;
`;

const ViewCount = styled.div`
  color: #ba68c8;
`;

const Title = styled.div`
  font-size: x-large;
  font-weight: bold;
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
  background: #e3f2fd;
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

const DiaryInfoBlock = styled.div`
  display: flex;
  justify-content: right;
  color: #8e24aa;
`;

const LikeCount = styled.div`
  padding: 0 10px;
`;

const CommentCount = styled.div`
  padding: 0 10px;
  color: #8e24aa;
`;
