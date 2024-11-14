import {
  updateCurrChat,
  updateCurrChatIsTyping,
  updateCurrChatOnlineStatus,
} from "@/lib/redux/chatSlice";
import { addMessage } from "@/lib/redux/messageSlice";
import { setSocket } from "@/lib/socket";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export const useSocket = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);
    setSocket(socket);
    socket.on("receiveMessage", (message) => {
      dispatch(addMessage(message));
      dispatch(updateCurrChat(message));
    });
    socket.on("checkIsOlineOrLastSeen", (data) => {
      dispatch(updateCurrChatOnlineStatus(data));
    });
    socket.on("typingAlert", (data: boolean) => {
      dispatch(updateCurrChatIsTyping(data));
    });
    return () => {
      socket.disconnect();
    };
  }, []);
};
