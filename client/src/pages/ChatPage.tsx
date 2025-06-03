import ChatUser from "@/components/ChatUser";
import CreateMessageForm from "@/components/CreateMessageForm";
import Messages from "@/components/Messages";
import { RootState } from "@/lib/redux/store";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { urls } from "./urls";
import { useEffect } from "react";

export default function ChatPage() {
  const { currChat } = useSelector((state: RootState) => state.chat);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currChat) {
      navigate(urls.home, { replace: true });
    }
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
