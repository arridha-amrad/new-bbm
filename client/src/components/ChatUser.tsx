import { RootState } from "@/lib/redux/store";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function ChatUser() {
  const { currChat } = useSelector((state: RootState) => state.chat);
  return (
    <Stack alignItems={"center"} direction={"row"} gap={1} py={1} px={2}>
      <Avatar src={currChat?.imageURL} />
      <Stack>
        <Typography fontWeight={"700"}>{currChat?.username}</Typography>
        <Typography
          lineHeight={0.9}
          variant="body2"
          color="textDisabled"
          fontStyle={"italic"}
        >
          Last seen 22:00
        </Typography>
      </Stack>
    </Stack>
  );
}
