"use client";
import axios from "axios";

let userid = ""
if (typeof window !== "undefined") {
  userid =  window.localStorage.getItem("user") || ""
  console.log(userid)
}

const axiosServices = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
  headers: {
    "Authorization": userid
  }
});


// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

export default axiosServices;
