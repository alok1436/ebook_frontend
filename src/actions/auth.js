import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_REGISTER_MESSAGE,
} from "./type";

import AuthService from "../services/auth.service";

export const register = (data) => (dispatch) => {
  return AuthService.register(data).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      // dispatch({
      //   type: REGISTER_SUCCESS,
      //   payload: response.data.message,
      // });
      return Promise.resolve(response);
    },
    (error) => {
      let message;
      let errors = [];
      dispatch({ type: REGISTER_FAIL });
      if (error.response && error.response.data.errors.email) {
        errors = error.response.data.errors.email;
        errors.forEach((element) => (message = element));
      } else if (error.response && error.response.data.error.password) {
        errors = error.response.data.error.password;
        errors.forEach((element) => (message = element));
      } else if (error.response && error.response.data.error.first_name) {
        errors = error.response.data.error.first_name;
        errors.forEach((element) => (message = element));
      } else if (error.response && error.response.data.error.last_name) {
        errors = error.response.data.error.last_name;
        errors.forEach((element) => (message = element));
      } else if (error.response && error.response.data.error.phone) {
        errors = error.response.data.error.phone;
        errors.forEach((element) => (message = element));
      } else if (error.response && error.response.data.message) {
        message = error.response.data.message;
      }

      // dispatch({type: SET_REGISTER_MESSAGE,payload: message});
      return Promise.reject(message);
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
    }
  );
};
export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      console.log(data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
    },
    (error) => {
      console.log("error", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message)
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
// export const forgotpassword = (username) => (dispatch) => {
//   return AuthService.forgotpassword(username).then(
//     (data) => {
//       // console.log(data);
//       if (data.data.verify_email) {
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: { user: data },
//         });
//         return Promise.resolve();
//       } else {
//         const message = "Your account is inactive.";
//         dispatch({
//           type: LOGIN_FAIL,
//         });
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
//         return Promise.reject(4);
//       }
//     },
//     (error) => {
//       console.log("error", error);
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       // dispatch({
//       //   type: LOGIN_FAIL,
//       // });
//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });
//       return Promise.reject();
//     }
//   );
// };
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
