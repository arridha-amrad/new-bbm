import { setCurrChat, TChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
  chat: TChat;
};

export default function Chat({ chat }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currChat } = useSelector((state: RootState) => state.chat);
  const clock = new Intl.DateTimeFormat("en-us", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  const setChat = () => {
    navigate(`/chat?chatId=${chat.chatId}`);
    dispatch(setCurrChat(chat));
  };
  return (
    <Paper
      onClick={setChat}
      component={"div"}
      square
      sx={{
        px: 2,
        py: 1,
        cursor: "pointer",
        background: currChat?.id === chat.id ? "#29b6f6" : "",
      }}
    >
      <Stack gap={2} alignItems="center" direction={"row"}>
        <Avatar src={chat.imageURL} sx={{ width: 56, height: 56 }} />
        <Stack width="100%" direction={"column"}>
          <Typography fontWeight={"700"}>{chat.username}</Typography>
          <Typography
            color="textSecondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chat.lastMessage}
          </Typography>
        </Stack>
        <Stack gap={2} direction={"column"}>
          <Typography color="textDisabled">{clock}</Typography>
          {chat.totalNotification > 0 && (
            <Badge
              sx={{ mr: 2 }}
              badgeContent={chat.totalNotification}
              anchorOrigin={{
                horizontal: "right",
              }}
              color="info"
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
