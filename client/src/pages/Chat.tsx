import ChatUser from "@/components/ChatUser";
import CreateMessageForm from "@/components/CreateMessageForm";
import Messages from "@/components/Messages";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function Chat() {
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
