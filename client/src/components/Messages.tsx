import { RootState } from "@/lib/redux/store";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchChatMessagesApi } from "@/api/chat";
import { setMessages } from "@/lib/redux/messageSlice";

export default function Messages() {
  const { messages } = useSelector((state: RootState) => state.message);
  const { user } = useSelector((state: RootState) => state.auth);
  const ref = useRef<HTMLDivElement | null>(null);

  const [params] = useSearchParams();
  const chatId = params.get("id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatId) {
      fetchChatMessagesApi(chatId).then(({ data }) => {
        dispatch(setMessages(data));
      });
    } else {
      dispatch(setMessages([]));
    }
  }, [chatId]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <Stack padding={2} flex={"1"} gap={2} overflow={"auto"}>
      {messages.map((msg) =>
        msg.userId === user?.id ? (
          <MyMessage message={msg} key={msg.id} />
        ) : (
          <OtherMessage message={msg} key={msg.id} />
        )
      )}
      <div ref={ref} />
    </Stack>
  );
}
