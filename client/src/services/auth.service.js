import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:5000/";

const register = (name, email, mobile, profile, countory, password) => {
  let promise = new Promise(function (resolve, reject) {
    axios.post(API_URL + "signup", {
      name, email, mobile, profile, countory, password
    },
      { 'Content-Type': 'multipart/form-data' }
    ).then((response) => {
      if (response.data.status === 200) {

        resolve(response.data);
      } else {
        reject(response.data.error)
      }
    });
  });
  return promise;
};

const login = (email, password) => {
  let promise = new Promise(function (resolve, reject) {

    axios.post(API_URL + "login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data?.status === 400) {
          reject(response.data.error)

        } else if (response.data.status === 200) {

          const userdata = response.data.user;
          userdata['token'] = response.data.token;
          // console.log(userdata);
          localStorage.setItem("user", JSON.stringify(userdata));
          resolve(response.data);
        }

      });
  });
  return promise;
};



const logout = () => {
  let promise = new Promise(function (resolve, reject) {

    const token = authHeader();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
    };

    axios.post(API_URL + "logout", bodyParameters, config)
      .then((response) => {
        resolve(response);

      }).catch(error => {
        console.log(error);
        reject(error);

      });
  });
  return promise;
};

export default {
  register,
  login,
  logout,
};
