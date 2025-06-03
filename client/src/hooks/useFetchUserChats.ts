import { fetchChatsApi } from "@/api/chat.api";
import { setChats } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function useFetchUserChats() {
  const { user } = useSelector((state: RootState) => state.auth);
  const effectRef = useRef(false);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (effectRef.current || !user) return;
    effectRef.current = true;
    const getUserChats = async () => {
      try {
        const res = await fetchChatsApi();
        const chats = res.data.chats;
        dispatch(setChats(chats));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserChats();
  }, []);

  return loading;
}
