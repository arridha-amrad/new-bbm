import Stack from "@mui/material/Stack";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function Chats() {
  const { chats } = useSelector((state: RootState) => state.chat);
  return (
    <Stack flex="1" overflow={"auto"} direction={"column"}>
      {chats.map((chat) => (
        <Chat chat={chat} key={chat.id} />
      ))}
    </Stack>
  );
}
