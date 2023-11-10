import axios from "axios";

const API_URL = process.env.VOID_API;

export const requestSignUp = (initialInfo, profileImg, navigate) => {
  const formData = new FormData();
  const userData = { initialInfo };

  formData.append("signUpRequest", JSON.stringify(userData));
  formData.append("profileImg", profileImg);

  let config = {
    method: "post",
    url: API_URL + "/sign-up",
    headers: {
      "Content-Type": "application/json",
    },
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
