import axios from "axios";

const API = axios.create({

  baseURL:
    process.env.REACT_APP_API_URL

});

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }

);

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (

      error.response?.status === 401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          localStorage.getItem(
            "refresh_token"
          );

        const response =
          await axios.post(

             `${process.env.REACT_APP_API_URL}/refresh`,

            {

              refresh_token:
                refreshToken

            }

          );

        const newAccessToken =
          response.data.access_token;

        localStorage.setItem(

          "token",

          newAccessToken

        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return API(
          originalRequest
        );

      } catch {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "refresh_token"
        );

        window.location.href =
          "/";

      }

    }

    return Promise.reject(
      error
    );

  }

);

export default API;