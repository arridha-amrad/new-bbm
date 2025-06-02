import { privateAxios, publicAxios } from "@/lib/axios";
import { TEditProfile } from "@/validators/user";

export type TSearchUserResultFromApi = {
  id: number;
  username: string;
  email: string;
  imageURL: string | null;
  createdAt: Date;
};
export const searchUserApi = async (key: string) => {
  return publicAxios.get<{ users: TSearchUserResultFromApi[] }>(
    `/users/search?key=${key}`
  );
};

export const editProfileApi = async (data: TEditProfile) => {
  return privateAxios.put(`/users`, data);
};
