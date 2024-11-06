import { privateAxios, publicAxios } from "@/lib/axios";
import { TEditProfile } from "@/validation/user";

export const searchUserApi = async (key: string) => {
  return publicAxios.get(`/users/search?key=${key}`);
};

export const editProfileApi = async (data: TEditProfile) => {
  return privateAxios.put(`/users`, data);
};
