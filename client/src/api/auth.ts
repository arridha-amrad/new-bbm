import { privateAxios, publicAxios } from "@/lib/axios";
import { TLogin, TRegister } from "@/validators/auth";

export const refreshTokenApi = async () => {
  return publicAxios.get("/auth/refresh-token");
};
export const registerApi = async (data: TRegister) => {
  return publicAxios.post("/auth/register", data);
};
export const loginApi = async (data: TLogin) => {
  return publicAxios.post("/auth", data);
};
export const meApi = async () => {
  return privateAxios.get("/auth");
};
export const logoutApi = async () => {
  return privateAxios.get("/auth/logout");
};
