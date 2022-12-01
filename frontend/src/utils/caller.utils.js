import axios from "axios";
import Cookies from "js-cookie";

// todo: refresh token api integration
// function to invoke api
const caller = async (api, formData = null, method = "GET") => {
  const url = `${import.meta.env.VITE_BASEURL}${api}`;
  const token = Cookies.get("refresh");

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const axiosInstance = axios.create({
    headers,
  });

  try {
    let { data, status, statusText } = await axiosInstance({
      url,
      method,
      data: formData,
    });
    const result = {
      data,
      status,
      statusText,
    };
    return result;
  } catch (error) {
    return error.response;
  }
};

export default caller;
