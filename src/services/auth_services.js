import { httpClient } from "../config/http_client";

export const login = async (username, password) => {
  try {
    const response = await httpClient.post("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (username, password) => {
  try {
    const response = await httpClient.post("/auth/register", {
      username,
      password,
    });

    if (response.status === 200) {
      const autoLogin = await login(username, password);
      return autoLogin;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
