import { meApi, refreshTokenApi } from "@/api/auth";
import { getToken, setToken } from "@/lib/axios";
import { redirect } from "react-router-dom";
import { fetchChatsApi } from "./api/chat";

export const rootLoader = async () => {
  try {
    const token = getToken();
    if (!token) {
      const { data } = await refreshTokenApi();
      setToken(data.token);
      const { data: d } = await meApi();
      return d.user;
    }
    const { data } = await meApi();
    return data.user;
  } catch (error) {
    return redirect("/login");
  }
};

export const homeLoader = async () => {
  const { data } = await fetchChatsApi();
  return data;
};
