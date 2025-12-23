import { httpClient } from "../config/http_client";

export const login = async (username, password) => {
  try {
    const response = await httpClient.post("/auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error de autenticación",
    };
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
    }
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Error de autenticación",
    };
  }
};
