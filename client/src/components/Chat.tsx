import { fetchMessages } from "@/api/chat";
import { setCurrChat, TChat } from "@/lib/redux/chatSlice";
import { setMessages } from "@/lib/redux/messageSlice";
import { RootState } from "@/lib/redux/store";
import { formatClock } from "@/utils";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
  chat: TChat;
};

export default function Chat({ chat }: Props) {
  const { currChat, chats } = useSelector((state: RootState) => state.chat);
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (chats[0].chatId === chat.chatId) {
      ref.current?.click();
    }
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clock = formatClock(chat.latestMessageDate ?? new Date());
  console.log({ clock, date: chat.latestMessageDate });

  const setChat = async () => {
    navigate(`/chat?chatId=${chat.chatId}`);
    dispatch(setCurrChat(chat));
    if (chat.chatId) {
      const { data } = await fetchMessages(chat.chatId);
      dispatch(setMessages(data));
    }
  };
  return (
    <Card>
      <CardActionArea
        ref={ref}
        onClick={setChat}
        sx={{
          px: 2,
          py: 1,
        }}
      >
        <Stack gap={2} alignItems="center" direction={"row"}>
          <Avatar src={chat.imageURL} sx={{ width: 56, height: 56 }} />
          <Stack width="100%" direction={"column"}>
            <Typography
              color={
                currChat?.username === chat.username
                  ? "textPrimary"
                  : "textDisabled"
              }
              fontWeight={"700"}
            >
              {chat.username}
            </Typography>
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
      </CardActionArea>
    </Card>
  );
}
