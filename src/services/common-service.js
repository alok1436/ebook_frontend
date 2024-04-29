import axios from "axios";
import authHeader from "./auth-header";
import '../GlobalVariables';
const API_URL = global.apiUrl;
const doPost = (endpoint, data) => {
  return axios.post(API_URL + "/"+ endpoint, data, { headers: authHeader() });
};

const doDelete = (endpoint, data) => { console.log(data);
  return axios.delete(API_URL + "/"+ endpoint, {headers:  authHeader(),data: data });
};

const doGet = (endpoint) => {
    return axios.get(API_URL + "/"+ endpoint, { headers: authHeader() });
};

export default {
    doPost,
    doGet,
    doDelete
};