import { meApi, refreshTokenApi } from "@/api/auth.api";
import { getAccessToken, setAccessToken } from "@/lib/axios";

export const getAuthUser = async () => {
  const token = getAccessToken();

  if (!token) {
    const response = await refreshTokenApi();
    setAccessToken(response.data.accessToken);
  }

  const { data } = await meApi();
  return data.user;
};
