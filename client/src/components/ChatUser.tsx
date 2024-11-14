import { RootState } from "@/lib/redux/store";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function ChatUser() {
  const { currChat } = useSelector((state: RootState) => state.chat);
  if (!currChat) return null;

  return (
    <Stack alignItems={"center"} direction={"row"} gap={1} py={1} px={2}>
      <Avatar src={currChat?.imageURL} />
      <Stack direction={"column"} justifyContent={"center"}>
        <Typography fontWeight={"700"}>{currChat?.username}</Typography>
        <Typography variant="body2" color="textDisabled" fontStyle={"italic"}>
          {currChat.isTyping ? "Typing..." : currChat.onlineStatus}
        </Typography>
      </Stack>
    </Stack>
  );
}
