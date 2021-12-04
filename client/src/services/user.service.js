import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

const getPublicContent = () => {
  console.log(API_URL + "all");
  return axios.get(API_URL + "all");
};

export default {
  getPublicContent
};