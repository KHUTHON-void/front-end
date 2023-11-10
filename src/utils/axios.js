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

export const requestSignIn = (signInInfo, navigate) => {
  let config = {
    method: "post",
    url: "https://void-team.kro.kr/api/login",
    data: signInInfo,
  };

  axios
    .request(config)
    .then((response) => {
      navigate("/profile");
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProfileInfo = (token, setProfileInfo) => {
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
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPostList = () => {};

export const getPostDetail = () => {};

export const bookmarkPost = () => {};

export const uploadPost = () => {};
