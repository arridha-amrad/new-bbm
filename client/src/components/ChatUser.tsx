import { RootState } from "@/lib/redux/store";
import { AvatarGroup } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function ChatUser() {
  const { currChat } = useSelector((state: RootState) => state.chat);
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  if (!currChat) return null;

  return (
    <Stack alignItems={"center"} direction={"row"} gap={1} py={1} px={2}>
      <AvatarGroup spacing="small">
        {currChat.isGroup
          ? currChat.participants.map((p) => (
              <Avatar alt={p.username} src={p.imageURL ?? undefined} />
            ))
          : currChat.participants
              .filter((p) => p.id !== authUser?.id)
              .map((u) => (
                <Avatar alt={u.username} src={u.imageURL ?? undefined} />
              ))}
      </AvatarGroup>
      <Stack direction={"column"} justifyContent={"center"}>
        {!currChat.isGroup && (
          <Typography>
            {currChat.participants
              .filter((p) => p.id !== authUser?.id)
              .map((p) => p.username)}
          </Typography>
        )}
        <Typography variant="body2" color="textDisabled" fontStyle={"italic"}>
          {/* {currChat.isTyping ? "Typing..." : currChat.onlineStatus} */}
        </Typography>
      </Stack>
    </Stack>
  );
}
