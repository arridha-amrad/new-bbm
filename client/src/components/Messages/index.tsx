import { fetchChatMessagesApi } from "@/api/chat.api";
import { setMessages } from "@/lib/redux/messageSlice";
import { RootState } from "@/lib/redux/store";
import Stack from "@mui/material/Stack";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";

export default function Messages() {
  const { messages, justReadMessageIds } = useSelector(
    (state: RootState) => state.message
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { currChat } = useSelector((state: RootState) => state.chat);

  const ref = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const [values] = useDebounce(justReadMessageIds, 1000);

  // useEffect(() => {
  //   if (values) {
  //     const newSet = new Set(values);
  //     const newArr = Array.from(newSet);
  //     console.log(newArr);
  //   }
  // }, [values]);

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
        msg.user.id === user?.id ? (
          <MyMessage message={msg} key={msg.id} />
        ) : (
          <OtherMessage message={msg} key={msg.id} />
        )
      )}
      <div ref={ref} />
    </Stack>
  );
}
