import { formatClock } from "@/helpers/formatClock";
import { setCurrChat, TChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  chat: TChat;
};

export default function Chat({ chat }: Props) {
  const { currChat } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clock = formatClock(chat.message.date ?? new Date());
  const [params] = useSearchParams();

  // useEffect(() => {
  //   if (chatId && chat.chatId === chatId) {
  //     socket?.emit("setChat", chat.userId, user?.id);
  //     dispatch(setCurrChat(chat));
  //   }
  // }, [chatId]);

  const setChat = async () => {
    dispatch(setCurrChat(chat));
    navigate("/chat");
  };

  return (
    <Card>
      <CardActionArea
        onClick={setChat}
        sx={{
          px: 2,
          py: 1,
        }}
      >
        <Stack gap={2} alignItems="center" direction={"row"}>
          <Avatar
            src={chat.receivers[0].imageURL ?? undefined}
            sx={{ width: 56, height: 56 }}
          />
          <Stack width="100%" direction={"column"}>
            <Typography
              color={
                currChat?.receivers[0].username === chat.receivers[0].username
                  ? "textPrimary"
                  : "textDisabled"
              }
              fontWeight={"700"}
            >
              {chat.receivers[0].username}
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
              {chat.message.content}
            </Typography>
          </Stack>
          <Stack gap={2} direction={"column"}>
            <Typography color="textDisabled">{clock}</Typography>
            {/* {chat.totalNotification > 0 && (
              <Badge
                sx={{ mr: 2 }}
                badgeContent={chat.totalNotification}
                anchorOrigin={{
                  horizontal: "right",
                }}
                color="info"
              />
            )} */}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
