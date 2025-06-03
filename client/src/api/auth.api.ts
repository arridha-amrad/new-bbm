import { privateAxios, publicAxios } from "@/lib/axios";
import { TLogin, TRegister } from "@/validators/auth";

export type TUserFromApi = {
  id: number;
  username: string;
  email: string;
  imageURL: string | null;
  createdAt: Date;
};

export const refreshTokenApi = async () => {
  const response = await publicAxios.post<{ accessToken: string }>(
    "/auth/refresh-token"
  );
  return response;
};

export const registerApi = async (data: TRegister) => {
  return publicAxios.post<{ accessToken: string; user: TUserFromApi }>(
    "/auth/register",
    data
  );
};

export const loginApi = async (data: TLogin) => {
  return publicAxios.post<{ accessToken: string; user: TUserFromApi }>(
    "/auth",
    data
  );
};

export const meApi = async () => {
  const response = await privateAxios.get<{ user: TUserFromApi }>("/auth");
  return response;
};

export const logoutApi = async () => {
  return privateAxios.post("/auth/logout");
};
