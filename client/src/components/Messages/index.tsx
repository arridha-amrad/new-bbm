import { RootState } from "@/lib/redux/store";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchChatMessagesApi } from "@/api/chat.api";
import { setMessages } from "@/lib/redux/messageSlice";
import { useDebounce } from "use-debounce";

export default function Messages() {
  const { messages, justReadMessageIds } = useSelector(
    (state: RootState) => state.message
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { currChat } = useSelector((state: RootState) => state.chat);

  const ref = useRef<HTMLDivElement | null>(null);

  const [params] = useSearchParams();
  const dispatch = useDispatch();

  const [values] = useDebounce(justReadMessageIds, 1000);

  useEffect(() => {
    if (values) {
      const newSet = new Set(values);
      const newArr = Array.from(newSet);
      console.log(newArr);
    }
  }, [values]);

  useEffect(() => {
    if (currChat?.id) {
      fetchChatMessagesApi(currChat.id).then(({ data }) => {
        dispatch(setMessages(data.messages));
      });
    } else {
      dispatch(setMessages([]));
    }
  }, [currChat?.id]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "instant" });
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
