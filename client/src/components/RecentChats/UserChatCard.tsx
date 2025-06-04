import { formatClock } from "@/helpers/formatClock";
import { setCurrChat, TChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import { AvatarGroup, CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  chat: TChat;
};

export default function Chat({ chat }: Props) {
  const { currChat } = useSelector((state: RootState) => state.chat);
  const { user: authUser } = useSelector((state: RootState) => state.auth);
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
        <Stack width="100%" gap={2} alignItems="center" direction={"row"}>
          <AvatarGroup spacing="small">
            {chat.isGroup
              ? chat.participants.map((p) => (
                  <Avatar src={p.imageURL ?? undefined} alt={p.username} />
                ))
              : chat.participants
                  .filter((p) => p.id !== authUser?.id)
                  .map((u) => (
                    <Avatar src={u.imageURL ?? undefined} alt={u.username} />
                  ))}
          </AvatarGroup>
          <Stack
            flex={1}
            flexWrap="nowrap"
            direction={"column"}
            overflow="hidden"
          >
            {!chat.isGroup && (
              <Typography>
                {chat.participants
                  .filter((p) => p.id !== authUser?.id)
                  .map((p) => p.username)}
              </Typography>
            )}
            <Typography
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              color="textSecondary"
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
