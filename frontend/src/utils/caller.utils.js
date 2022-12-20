import axios from "axios";
import Cookies from "js-cookie";
import notification from "./notification.utils";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("refresh");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      return { ...config, headers, withCredentials: true };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response.data.success) {
      notification(error.response.data.message, "danger");
    }
    return Promise.reject(error.response.data.message);
  },
);

// function to invoke api
const caller = async (api, formData = null, method = "GET") => {
  const url = `${import.meta.env.VITE_BASEURL}${api}`;
  const response = await axiosInstance({
    url,
    method,
    data: formData,
  });
  return response.data;
};

export default caller;
