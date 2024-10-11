import Stack from "@mui/material/Stack";
import Chat from "./Chat";
import Divider from "@mui/material/Divider";

export default function Chats() {
  return (
    <Stack flex="1" overflow={"auto"} direction={"column"}>
      <Chat />
      {/* <Divider />
      <Chat /> */}
    </Stack>
  );
}
