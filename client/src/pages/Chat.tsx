import ChatUser from "@/components/ChatUser";
import CreateMessageForm from "@/components/CreateMessageForm";
import Messages from "@/components/Messages";
import { useSocket } from "@/hooks/useSocket";
import { updateChat } from "@/lib/redux/chatSlice";
import { addMessage } from "@/lib/redux/messageSlice";
import { RootState } from "@/lib/redux/store";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function Chat() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { setSocket } = useSocket();
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL);
    setSocket(socket);
    if (user) {
      socket.emit("addUser", {
        username: user.username,
        userId: user.id,
      });
      socket.on("receiveMessage", (message) => {
        dispatch(addMessage(message));
        dispatch(updateChat(message));
      });
    }
    return () => {
      socket.disconnect();
      // socket.off("receiveMessage");
    };
  }, []);

  return (
    <Stack display={"flex"} direction={"column"} height={"inherit"}>
      <ChatUser />
      <Divider />
      <Messages />
      <Stack>
        <Divider />
        <CreateMessageForm />
      </Stack>
    </Stack>
  );
}
