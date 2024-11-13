import { addChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import { offSearch, TUSerSearch } from "@/lib/redux/userSlice";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
  user: TUSerSearch;
  setChatError: Dispatch<SetStateAction<string>>;
};

const User = ({ user, setChatError }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { chats } = useSelector((state: RootState) => state.chat);
  const addToChats = () => {
    const isAlreadyChat = chats.find((c) => c.userId === user.id);
    if (isAlreadyChat) {
      navigate(`/chat?id=${isAlreadyChat.chatId}`);
    } else {
      if (user.id !== authUser?.id) {
        dispatch(
          addChat({
            ...user,
            chatName: null,
            userId: user.id,
            lastMessage: "",
            chatId: null,
            totalNotification: 0,
            latestMessageDate: null,
          })
        );
      } else {
        setChatError("You cannot chat with your own account");
      }
    }
    dispatch(offSearch());
  };
  return (
    <Paper
      onClick={addToChats}
      component={"div"}
      square
      sx={{
        px: 2,
        py: 2,
        cursor: "pointer",
      }}
    >
      <Stack gap={2} alignItems="center" direction={"row"}>
        <Avatar src={user?.imageURL} sx={{ width: 56, height: 56 }} />
        <Stack width="100%" direction={"column"}>
          <Typography fontWeight={"700"}>{user?.username}</Typography>
          <Typography color="textSecondary">{user?.email}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default User;
