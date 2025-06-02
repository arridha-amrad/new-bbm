import { meApi, refreshTokenApi } from "@/api/auth.api";
import { getToken, setToken } from "@/lib/axios";
import { redirect } from "react-router-dom";
import { fetchChatsApi } from "./api/chat.api";

export type THomeLoader = Awaited<ReturnType<typeof homeLoader>>;
export const homeLoader = async () => {
  try {
    let token = getToken();
    if (!token) {
      const data = await refreshTokenApi();
      setToken(data.accessToken);
      token = data.accessToken;
      console.log({ accToken: data.accessToken });
    }
    const { user } = await meApi();
    const { chats } = await fetchChatsApi();
    return {
      user,
      chats,
    };
  } catch (err) {
    throw redirect("/login");
  }
};
