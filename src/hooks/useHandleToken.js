import { useState } from "react";
import axios from "axios";
import { getCookie, setCookie } from "react-use-cookie";

const apiUrl = "http://localhost:3001";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = getCookie("token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = getCookie("token");
      console.log(access_token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

const useHandleToken = () => {
  const savedToken = getCookie("token");
  let initedState =
    savedToken === "" ? null : savedToken === null ? null : savedToken;
  const [storedJwt, updateStoredJwt] = useState(initedState);

  const createJwt = async () => {
    const { data } = await axios.get(`${apiUrl}/jwt`);
    updateStoredJwt(data.token);
    initedState = data.token;
    setCookie("token", data.token);
  };

  const removeToken = () => {
    setCookie("token", "");
    updateStoredJwt(null);
    initedState = null;
  };

  return {
    createJwt,
    storedJwt,
    removeToken,
    initedState,
  };
};

export default useHandleToken;
