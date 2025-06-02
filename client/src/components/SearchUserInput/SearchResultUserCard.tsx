import { TSearchUserResultFromApi } from "@/api/user.api";
import { initNewChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import { offSearch } from "@/lib/redux/userSlice";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
  user: TSearchUserResultFromApi;
  setChatError: Dispatch<SetStateAction<string>>;
};

const SearchResultUserCard = ({ user, setChatError }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const { chats } = useSelector((state: RootState) => state.chat);

  // const addToChats = () => {
  //   const isAlreadyChat = chats.find(
  //     (c) => c.receivers.filter((r) => r.id !== authUser?.id)[0] === user.id
  //   );
  //   if (isAlreadyChat) {
  //     navigate(`/chat?id=${isAlreadyChat.id}`);
  //   } else {
  //     if (user.id !== authUser?.id) {
  //       dispatch(initNewChat(user));
  //       navigate(`/chat`);
  //     } else {
  //       setChatError("You cannot chat with your own account");
  //     }
  //   }
  //   dispatch(offSearch());
  // };

  const addToChats = () => {
    if (user.id === authUser?.id) {
      setChatError("You cannot chat with your own account");
      return;
    }
    navigate("/chat");
    dispatch(initNewChat([user]));
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
        <Avatar
          src={user?.imageURL ?? undefined}
          sx={{ width: 56, height: 56 }}
        />
        <Stack width="100%" direction={"column"}>
          <Typography fontWeight={"700"}>{user?.username}</Typography>
          <Typography color="textSecondary">{user?.email}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SearchResultUserCard;
