import Stack from "@mui/material/Stack";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function Chats() {
  const { chats } = useSelector((state: RootState) => state.chat);
  return (
    <Stack flex="1" overflow={"auto"} direction={"column"}>
      <Divider textAlign="left">
        <Typography variant="subtitle2" color="textDisabled">
          Recent chats
        </Typography>
      </Divider>
      {chats.map((chat) => (
        <Chat chat={chat} key={chat.id} />
      ))}
    </Stack>
  );
}
