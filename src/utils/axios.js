import axios from "axios";
import default_profile from "../assets/khu_logo.png";
const API_URL = process.env.VOID_API;

export const requestSignUp = (initialInfo, profileImg, navigate, setCookie) => {
  console.log(initialInfo);
  const formData = new FormData();
  const blobData = new Blob([JSON.stringify(initialInfo)], { type: "application/json" });
  formData.append("signUpRequest", blobData);
  formData.append("profileImg", profileImg);

  let config = {
    method: "post",
    url: "https://void-team.kro.kr/api/sign-up",
    data: formData,
  };

  axios
    .request(config)
    .then((response) => {
      const token = response.headers.authorization;
      setCookie("jwt-token", token, { path: "/", secure: true });
      navigate("/profile", {
        state: {
          profileImg: response.data.profileImgURL,
          nickname: response.data.nickname,
          grade: response.grade,
        },
      });
      console.log(response.data, token);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const requestSignIn = (signInInfo, navigate, setCookie) => {
  let config = {
    method: "post",
    url: "https://void-team.kro.kr/api/login",
    data: signInInfo,
  };

  axios
    .request(config)
    .then((response) => {
      const token = response.headers.authorization;
      setCookie("jwt-token", token, { path: "/", secure: true });
      navigate("/profile");
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProfileInfo = (token, setProfileInfo, setCookie) => {
  let config = {
    method: "get",
    url: "https://void-team.kro.kr/api/validate-jwt",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      let profileImg = response.data.profileImgURL;
      if (profileImg === null) {
        profileImg = default_profile;
      }
      setProfileInfo({
        profileImg: profileImg,
        grade: response.data.grade,
        nickname: response.data.nickname,
      });
      setCookie("grade", response.data.grade);
      setCookie("profileImg", profileImg);
      setCookie("nickname", response.data.nickname);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAskPostList = async (category, token) => {
  try {
    console.log(category, token);
    if (category === null) {
      let config = {
        method: "get",
        url: `https://void-team.kro.kr/api/board/rooms?sort=LIKE`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      console.log(response.data);
      return response.data;
    } else {
      let config = {
        method: "get",
        url: `https://void-team.kro.kr/api/board/rooms?category=${category}&sort=LIKE`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(config);
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    // Handle error or throw it again if you want to handle it outside
    throw error;
  }
};

export const uploadAskPost = (data, img, setIsModalOpen, token) => {
  const formData = new FormData();
  const blobData = new Blob([JSON.stringify(data)], { type: "application/json" });

  formData.append("mediaList", img);
  formData.append("data", blobData);

  let config = {
    method: "post",
    url: "https://void-team.kro.kr/api/board",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      setIsModalOpen(false);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPostList = (token, setPostList) => {
  let config = {
    method: "get",
    url: "https://void-team.kro.kr/api/recruit/list",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      setPostList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPostDetail = (token, postId, navigate) => {
  console.log(postId);
  let config = {
    method: "get",
    url: `https://void-team.kro.kr/api/recruit/${postId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      const post = response.data;
      navigate(`/recruit/${post.recruitId}`, { state: post });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const bookmarkPost = () => {};

export const uploadPost = (token, postData, setIsModalOpen) => {
  console.log(postData);
  let config = {
    method: "post",
    url: "https://void-team.kro.kr/api/recruit",
    data: postData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      setIsModalOpen(false);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAskPostDetail = (id, token, navigate) => {
  let config = {
    method: "get",
    url: `https://void-team.kro.kr/api/board/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
      navigate(`/ask/${id}`, {
        state: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deletePost = () => {};

export const getCommentList = () => {};

export const postComment = () => {};

export const editComment = () => {};

export const deleteComment = () => {};
