export const getToken = () => sessionStorage.getItem("access_token");
import { api } from "../api";

export const loginService = async (email: string, password: string) => {
  try {
    const { data } = await api.post("/auth/signin", {
      email,
      password,
    });
    sessionStorage.setItem("access_token", data.token);
    return data;
  } catch (error) {
    return error;
  }
};

export const getrole = async () => {
  try {
    const { data } = await api.get("/auth/me");
    return data;
  } catch (error) {
    return error;
  }
};
