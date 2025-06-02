import { privateAxios, publicAxios } from "@/lib/axios";
import { TLogin, TRegister } from "@/validators/auth";

export const refreshTokenApi = async () => {
  const response = await publicAxios.post("/auth/refresh-token");
  return response;
};

export const registerApi = async (data: TRegister) => {
  return publicAxios.post("/auth/register", data);
};

export const loginApi = async (data: TLogin) => {
  return publicAxios.post("/auth", data);
};

export const meApi = async () => {
  const response = await privateAxios.get("/auth");
  return response;
};

export const logoutApi = async () => {
  return privateAxios.get("/auth/logout");
};
