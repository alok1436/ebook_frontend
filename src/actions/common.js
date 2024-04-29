import { SET_MESSAGE } from "./type";

import CommonService from "../services/common-service";

export const doPost = (endpoint, data) => (dispatch) => {
  return CommonService.doPost(endpoint, data).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: data.data.message,
      });
      return Promise.resolve(data);
    },
    (error) => {
      console.log("error", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response.data);
    }
  );
};

export const doDelete = (endpoint, data) => (dispatch) => {
  return CommonService.doDelete(endpoint, data).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: data.data.message,
      });
      return Promise.resolve(data);
    },
    (error) => {
      console.log("error", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error.response.data);
    }
  );
};

export const doGet = (endpoint) => (dispatch) => {
  return CommonService.doGet(endpoint).then(
    (data) => {
      return Promise.resolve(data);
    },
    (error) => {
      return Promise.reject(error.response.data);
    }
  );
};
