import axios from "axios";

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
  const formData = new FormData();
  const userData = { signInInfo };

  formData.append("signInRequest", JSON.stringify(userData));

  let config = {
    method: "post",
    url: API_URL + "/login",
    data: formData,
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
