import { sendMessageApi } from "@/api/chat.api";
import SentAudio from "@/assets/sent.mp3";
import { updateCurrChat } from "@/lib/redux/chatSlice";
import { addNewMessage } from "@/lib/redux/messageSlice";
import { RootState } from "@/lib/redux/store";
import Add from "@mui/icons-material/Add";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import Send from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "./EmojiPicker";

export default function CreateMessageForm() {
  const [text, setText] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch();
  const { currChat } = useSelector((state: RootState) => state.chat);
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const cursorPositionRef = useRef(0);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setText(target.value);
  };

  const handleCursorPosition = (
    e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const position = e.currentTarget.selectionStart;
    cursorPositionRef.current = position ?? 0;
  };
  const handleCursorPositionOnClick = () => {
    const el = inputRef.current;
    if (el) {
      const cursorPos = el.selectionStart;
      cursorPositionRef.current = cursorPos ?? 0;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currChat || !authUser) return;
    const audio = new Audio(SentAudio);
    const sentAt = new Date().toISOString();
    try {
      const {
        data: { message },
      } = await sendMessageApi({
        sentAt,
        content: text,
        receiverIds: currChat.participants
          .filter((p) => p.id !== authUser?.id)
          .map((r) => r.id),
        chatId: currChat.id,
        chatName: currChat.name ?? undefined,
        isGroup: currChat.isGroup,
      });
      await audio.play();
      dispatch(
        updateCurrChat({
          chatId: message.chatId,
          content: message.content,
          id: message.id,
          sentAt: message.sentAt,
          user: {
            id: authUser.id,
            imageURL: authUser.imageURL,
            username: authUser.username,
          },
          reactions: [],
          readers: [],
        })
      );
      dispatch(
        addNewMessage({
          chatId: message.chatId,
          content: message.content,
          id: message.id,
          sentAt: message.sentAt,
          user: {
            id: authUser.id,
            imageURL: authUser.imageURL,
            username: authUser.username,
          },
          reactions: [],
          readers: [],
        })
      );
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      position="relative"
      sx={{ py: 1.5, px: 1 }}
      direction={"row"}
      gap={1}
      alignItems={"end"}
    >
      {showPicker && (
        <Box position="absolute" bottom="100%" left={0}>
          <EmojiPicker
            cursorPosition={cursorPositionRef}
            inputRef={inputRef}
            setText={setText}
            open={showPicker}
          />
        </Box>
      )}
      <IconButton
        onClick={() => setShowPicker((val) => !val)}
        type="button"
        aria-label="search"
      >
        <EmojiEmotions color="disabled" />
      </IconButton>
      <Box
        flex={1}
        sx={{
          display: "flex",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "0.3rem",
          p: 0.5,
        }}
      >
        <InputBase
          onChange={handleTextChange}
          inputRef={inputRef}
          onKeyUp={handleCursorPosition}
          onClick={handleCursorPositionOnClick}
          value={text}
          fullWidth
          multiline
          maxRows={3}
          sx={{ flex: "1", pl: 1 }}
        />
      </Box>
      <IconButton>
        <Add color="disabled" />
      </IconButton>
      <IconButton type="submit">
        <Send color={text ? "info" : "disabled"} />
      </IconButton>
    </Stack>
  );
}
