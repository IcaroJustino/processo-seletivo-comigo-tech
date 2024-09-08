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
