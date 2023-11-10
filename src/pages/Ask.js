import Filtering from "../components/Filtering";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { ReactComponent as WriteIcon } from "../assets/pen.svg";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import WriteAskModal from "../components/WriteAskModal";
import { useCookies } from "react-cookie";
import { getAskPostList, getAskPostDetail } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Ask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };
  const [cookies, setCookie] = useCookies();
  const token = cookies["jwt-token"];
  const grade = cookies["grade"];
  const nickname = cookies["nickname"];
  const profileImg = cookies["profileImg"];

  useEffect(() => {
    const fetchData = async () => {
      let responseData;
      responseData = await getAskPostList(activeFilter, token);

      setFilteredData(responseData);
      console.log(responseData);
    };

    // activeFilter 값이 변경될 때마다 fetchData 함수 호출
    if (activeFilter) {
      fetchData();
    }
  }, [activeFilter]);

  const effectFunc = async () => {
    let responseData;
    responseData = await getAskPostList(activeFilter, token);

    setFilteredData(responseData);
    console.log(responseData);
  };
  useEffect(() => {
    effectFunc();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <SearchBarContainer>
        <SearchBar
          width="600px"
          height="44px"
          fontSize="21px"
          placeholder="검색할 내용을 입력하세요"
        />
      </SearchBarContainer>
      <Filtering
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <FilteredBody>
        {filteredData.map((post) => (
          <PostBlock key={post.boardId}>
            <PostHeader
              onClick={() => {
                getAskPostDetail(post.boardId, token, navigate);
              }}
            >
              <ThumbnailBox>
                {post.member.profileImgUr ? (
                  <ThumbnailImg
                    src={post.member.profileImg[0]}
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
        ))}
      </FilteredBody>
      <WritePostButton onClick={handleModalOpen}>
        <WriteIcon
          fill="white"
          width="40px"
        />
      </WritePostButton>
      <Footer />
      {isModalOpen && (
        <WriteAskModal
          setIsModalOpen={setIsModalOpen}
          name={nickname}
          profileImg={profileImg}
        />
      )}
    </>
  );
};

export default Ask;

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
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

const FilteredBody = styled.div`
  margin-left: 220px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 220px;
`;
