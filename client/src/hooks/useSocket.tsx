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
import ReceiveSound from "@/assets/receive.mp3";

export const useSocket = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);
    setSocket(socket);
    socket.on("receiveMessage", async (message) => {
      const audio = new Audio(ReceiveSound);
      await audio.play();
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
