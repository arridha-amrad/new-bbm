import { publicAxios } from "@/lib/axios";

export const searchUserApi = async (key: string) => {
  return publicAxios.get(`/users/search?key=${key}`);
};
