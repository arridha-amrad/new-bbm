import { addChat } from "@/lib/redux/chatSlice";
import { offSearch, TUSerSearch } from "@/lib/redux/userSlice";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Props = {
  user: TUSerSearch;
};

const User = ({ user }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToChats = () => {
    dispatch(
      addChat({
        ...user,
        userId: user.id,
        lastMessage: "",
        chatId: null,
        totalNotification: 0,
        latestMessageDate: null,
      })
    );
    navigate("/chat?id=");
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
