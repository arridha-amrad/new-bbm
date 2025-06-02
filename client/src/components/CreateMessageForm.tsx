import { sendMessageApi } from "@/api/chat";
import useClickOutside from "@/hooks/useClickOutside";
import { updateCurrChat } from "@/lib/redux/chatSlice";
import { addMessage } from "@/lib/redux/messageSlice";
import { RootState } from "@/lib/redux/store";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Add from "@mui/icons-material/Add";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import Send from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SentAudio from "@/assets/sent.mp3";

export default function CreateMessageForm() {
  const [text, setText] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch();
  const { currChat } = useSelector((state: RootState) => state.chat);

  const [_, setParams] = useSearchParams();
  // const { domNodeRef: pickerRef } = useClickOutside(
  //   () => setShowPicker(false),
  //   inputRef
  // );

  const handleEmojiSelect = (emoji: any) => {
    if ("native" in emoji) {
      const start = text.slice(0, cursorPosition);
      const end = text.slice(cursorPosition);
      const newText = start + emoji.native + end;
      setText(newText);
      const newCursorPosition = cursorPosition + emoji.native.length;
      setCursorPosition(newCursorPosition);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition
          );
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const updateCursorPosition = () => {
    if (inputRef.current) {
      const currentPosition = inputRef.current.selectionStart ?? 0;
      setCursorPosition(currentPosition);
    }
  };

  const handleOnBlur = () => {
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setText(target.value);
    setCursorPosition(target.selectionStart ?? 0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currChat) return;
    const audio = new Audio(SentAudio);
    const sentAt = new Date().toISOString()
    try {
      const { data } = await sendMessageApi({
        sentAt,
        content: text,
        receiverIds: currChat.receiverIds,
        chatId: currChat.chatId
      });
      if (currChat.chatId === null) {
        setParams({ id: data.message.chatId });
      }
      await audio.play();
      dispatch(updateCurrChat(data.message));
      dispatch(addMessage(data.message));
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
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
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
          onKeyUp={updateCursorPosition}
          onMouseUp={updateCursorPosition} // Update cursor position on click
          onFocus={updateCursorPosition}
          onChange={handleTextChange}
          onBlur={handleOnBlur}
          inputRef={inputRef}
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
