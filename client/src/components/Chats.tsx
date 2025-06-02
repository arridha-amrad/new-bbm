import Stack from "@mui/material/Stack";
import Chat from "./UserChatCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { fetchChatsApi } from "@/api/chat";
import { setChats } from "@/lib/redux/chatSlice";

type TChatFromApi = {
  id: number;
  name: string | null;
  participants: {
    id: number;
    username: string;
    imageURL: string | null;
  }[];
  message: string;
  messageDate: Date;
}

export default function Chats() {
  const { chats } = useSelector((state: RootState) => state.chat);

  const effectRef = useRef(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (effectRef.current) return
    effectRef.current = true
    const getUserChats = async () => {
      const res = await fetchChatsApi()
      const chats = res.data.chats as ;
      dispatch(setChats())
    }
    getUserChats()
  }, [])

  return (
    <Stack flex="1" overflow={"auto"} direction={"column"}>
      <Divider textAlign="left">
        <Typography variant="subtitle2" color="textDisabled">
          Recent chats
        </Typography>
      </Divider>
      {chats.map((chat, i) => (
        <Chat chat={chat} key={i} />
      ))}
    </Stack>
  );
}
