import axios from "axios";
import "../GlobalVariables";
const API_URL = global.apiUrl;
const HEADER = global.header;
const register = (data) => {
  return axios.post(API_URL + "/register", data, HEADER);
};
const login = (username, password) => {
  console.log('HEADER',HEADER);
  return axios
    .post(
      API_URL + "/login",
      {
        email:username,
        password:password,
      },
      HEADER
    )
    .then((response) => {
      localStorage.setItem(
        "auth_user",JSON.stringify(response.data.user)
      )

      localStorage.setItem(
        "token",response.data.token
      );
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("auth_user");
  localStorage.removeItem("token");
};
export default {
  register,
  login,
  logout,
};
