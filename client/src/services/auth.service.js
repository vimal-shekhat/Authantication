import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (name,email,mobile,profile,countory, password) => {
  let promise = new Promise(function(resolve, reject) {
  axios.post(API_URL + "signup", {
    name,email,mobile,profile,countory, password
  }).then((response)=>{
    if(response.data.status===200){
     
         resolve(response.data);
    }else{
          reject(response.data.error)
    }
   });
});
return promise;
};

const login = (email, password) => {
  let promise = new Promise(function(resolve, reject) {

 axios.post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
       if (response.data?.status==400) {
        reject(response.data.error)
      
      }else if(response.data?.token){
        
        localStorage.setItem("user", JSON.stringify(response.data));
        resolve(response.data);
      }
      
    });
  });
  return promise;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
