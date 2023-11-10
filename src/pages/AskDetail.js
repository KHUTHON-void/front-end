import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import DateConverter from "../utils/DateConverter";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import question from "../assets/question.png";
import answer from "../assets/answer.png";
import {
  deleteComment,
  deletePost,
  editComment,
  getCommentList,
  postComment,
} from "../utils/axios";
import { ReactComponent as SendIcon } from "../assets/paper_plane.svg";
import { ReactComponent as CloseIcon } from "../assets/close_gray.svg";
import khu_logo from "../assets/khu_logo.png";
import goldLogo from "../assets/silver.png";
import bronzelogo from "../assets/bronze.png";
import WriteRecruitModal from "../components/WriteRecruitModal";

const RecruitDetail = () => {
  const location = useLocation();
  const cookies = useCookies();
  const navigate = useNavigate();
  const { state } = location;
  const post = state;
  const token = cookies["jwt-token"];
  const grade = cookies["grade"];
  const nickname = cookies["nickname"];
  const profileImg = cookies["profileImg"];
  const [commentList, setCommentList] = useState([
    {
      commentId: 1,
      content: "굉장히 쉬운 문제입니다.",
      isMyPost: false,
      member: {
        memberId: 1,
        nickname: "장승환",
        university: "KHU",
        grade: "GOLD",
      },
      createdDate: "2023-11-10T18:36:59.05106",
    },
    {
      commentId: 2,
      content: "역수를 곱하시면 됩니다~",
      isMyPost: false,
      member: {
        memberId: 1,
        nickname: "윤성배",
        university: "KHU",
        grade: "BRONZE",
      },
      createdDate: "2023-11-10T18:36:59.05106",
    },
  ]);
  const [commentData, setCommentData] = useState({ content: "", hashtagList: [] });
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [extendingCommentId, setExtendingCommentId] = useState(null);
  const [writingRecommentId, setWritingRecommentId] = useState();
  const [isEditingPost, setIsEditingPost] = useState(false);
  const INPUT_IS_EMPTY = commentData.content === "";

  useEffect(() => {
    getCommentList(post.recruitId, setCommentList);
  }, [post.recruitId]);

  const handleInput = (e) => {
    const newData = { ...commentData, content: `${e.currentTarget.value}` };
    setCommentData(newData);
  };

  const handleEdit = (e) => {
    const newComment = e.currentTarget.value;
    setEditedComment(newComment);
  };

  const handlePostComment = (postId, commentData) => {
    !INPUT_IS_EMPTY && postComment(postId, commentData);
  };

  const handleEditClick = (commentId, initialComment) => {
    setEditingCommentId(commentId);
    setEditedComment(initialComment);
  };

  const handleSaveClick = (postId, commentId, type) => {
    switch (type) {
      default:
        setEditingCommentId(null);
        break;
      case "editComment":
        editComment(postId, commentId, editedComment);
        break;
    }
    setEditingCommentId(null);
    setEditedComment("");
  };

  return (
    <>
      <Header />
      <PageBody>
        <DiaryHeader>
          <TitleLine>
            <Title>{post.title}</Title>
            <DateContainer>
              <DateInfo>작성 일자 : {post.createdDate.slice(0, -7)}</DateInfo>
              <DateInfo>수정 일자 : {post.modifiedDate.slice(0, -7)}</DateInfo>
            </DateContainer>
          </TitleLine>
          <AuthorLine>
            <AuthorInfoContaienr>
              <AuthorProfileImg />
              <Author>{post.member.nickname}</Author>
            </AuthorInfoContaienr>
            <EditDeleteConsole>
              <EditButton onClick={() => setIsEditingPost(true)}>수정</EditButton>
              <DeleteButton onClick={() => deletePost(post.recruitId)}>삭제</DeleteButton>
            </EditDeleteConsole>
          </AuthorLine>
        </DiaryHeader>
        <DiaryBody>
          <img src={question} />
          <DiaryContent>{post.content}</DiaryContent>
        </DiaryBody>
        <DiaryCommentContainer>
          <CommentInputOutlay>
            <CommentInput
              className="input"
              type="text"
              value={commentData.content}
              onChange={handleInput}
            ></CommentInput>
            <IconContainer>
              <SendIcon
                className={INPUT_IS_EMPTY ? "deactivate" : "activate"}
                onClick={() => handlePostComment(post.recruitId, commentData)}
              />
            </IconContainer>
          </CommentInputOutlay>
          <CommentsContainer>
            <CommentCount>댓글 {commentList.length}</CommentCount>
            {!!commentList.length &&
              commentList.map((comment) => (
                <div key={comment.commentid}>
                  {comment.commentId === editingCommentId ? (
                    <CommentEditOutlay>
                      <CommentEditInput
                        className="input"
                        value={editedComment}
                        onChange={handleEdit}
                      />
                      <CloseIcon
                        className="Icon close"
                        width="18px"
                        height="18px"
                        fill="#313338"
                        onClick={() => setEditingCommentId(null)}
                      />
                      <SendIcon
                        className={editedComment === "" ? "deactivate Icon" : "activate Icon"}
                        onClick={() => handleSaveClick(post.recruitId, comment.commentId)}
                      />
                    </CommentEditOutlay>
                  ) : (
                    <CommentOutlay>
                      <Comment>
                        <CommentHeader>
                          <KhuLogo src={khu_logo} />
                          <ProfileImg />
                          <Name>{comment.member.nickname}</Name>
                          <InfoBox>
                            <GoldTier src={goldLogo} />
                          </InfoBox>
                          <WrittenTime>{DateConverter(comment.createdDate)}</WrittenTime>
                        </CommentHeader>
                        <Body>
                          <Content>{comment.content}</Content>
                          {comment.member.nickname === "장승환" && <img src={answer} />}
                        </Body>
                        <EditCommentButton onClick={() => navigate(`/videochat`)}>
                          만나보기
                        </EditCommentButton>
                      </Comment>
                    </CommentOutlay>
                  )}
                </div>
              ))}
          </CommentsContainer>
        </DiaryCommentContainer>
      </PageBody>
      {isEditingPost && (
        <WriteRecruitModal
          token={token}
          name={nickname}
          setIsModalOpen={setIsEditingPost}
        />
      )}
      <Footer />
    </>
  );
};

export default RecruitDetail;

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
`;

const DiaryHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 886px;
  border-bottom: 1px solid;
  font-size: 1.5rem;
`;

const TitleLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AuthorLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfoContaienr = styled.div`
  display: flex;
  justify-contetn: center;
  align-items: center;
`;

const AuthorProfileImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 100px;
  background: #8b8b8b;
`;

const Author = styled.div`
  font-size: 1rem;
`;

const EditDeleteConsole = styled.div`
  display: flex;
  justify-contetn: center;
  align-items: center;
  font-size: 0.9rem;
`;

const EditButton = styled.div`
  padding: 6px;
  cursor: pointer;
`;

const DeleteButton = styled(EditButton)``;

const DateContainer = styled.div``;

const DateInfo = styled.div`
  font-size: 0.8rem;
`;

const DiaryBody = styled.div`
  width: 886px;
  min-height: 400px;
  padding: 10px;
`;

const Title = styled.div``;

const DiaryContent = styled.div``;

const DiaryCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const CommentInputOutlay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 886px;
  height: 100px;
  border: none;
  border-radius: 100px;
  background: #f3e5f5;
  padding: 50px;
  font-family: Pretendard;
  .input::-webkit-scrollbar {
    display: none;
  }
`;

const CommentInput = styled.textarea`
  width: 750px;
  height: 100px;
  border: none;
  resize: none;
  outline: none;
  align-items: center;
  background: #f3e5f5;
  padding: 10px;
  font-size: 1rem;
  font-family: Pretendard;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  .deactivate {
    fill: #8b8b8b;
  }
  .activate {
    fill: #313338;
    cursor: pointer;
  }
  .open {
    transform: rotate(180deg);
    transition: 0.5s;
  }
`;

const CommentsContainer = styled.div``;

const CommentCount = styled.div`
  margin: 10px 0px 0px 20px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CommentEditOutlay = styled.div`
  width: 886px;
  margin: 20px 0px 50px 0px;
  border-bottom: 1px solid;
  position: relative;
  .Icon {
    position: absolute;
    right: 10px;
    bottom: -30px;
    cursor: pointer;
  }
  .close {
    right: 50px;
  }
  .deactivate {
    fill: #8b8b8b;
  }
  .activate {
    fill: #313338;
    cursor: pointer;
  }
  .input::-webkit-scrollbar {
    display: none;
  }
`;

const CommentOutlay = styled.div`
  .invisible {
    display: none;
  }
`;

const Comment = styled.div`
  position: relative;
  margin-top: 34px;
  width: 886px;
`;

const CommentEditInput = styled.textarea`
  width: 800px;
  min-height: 20px;
  overflow-y: scroll;
  border: none;
  resize: none;
  outline: none;
  align-items: center;
  font-size: 1rem;
  font-family: Pretendard;
`;

const ProfileImg = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 100px;
  background: #d2d2d2;
`;

const CommentHeader = styled.div`
  display: flex;
  height: 16px;
  align-items: center;
`;
const Name = styled.div`
  height: 16px;
  margin-left: 5px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
  color: #313338;
`;

const GoldTier = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100px;
`;

const KhuLogo = styled(GoldTier)`
  width: 72px;
  height: 56px;
`;

const WrittenTime = styled.div`
  margin-left: 10px;
  font-size: 0.8rem;
  color: #8b8b8b;
`;

const Body = styled.div`
  margin: 5px 0px 0px 23px;
`;
const Content = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 21px;
`;

const InfoBox = styled.div`
  display: flex;
`;

const EditCommentButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 50px;
  top: 0px;
  background: #ba68c8;
  color: #ffffff;
  border-radius: 100px;
  width: 100px;
  height: 40px;
  cursor: pointer;
  :hover {
    opacity: 0.3;
    transition: 0.3s;
  }
`;
