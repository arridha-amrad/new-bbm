import { giveReactionToMessageApi, TFetchMessageFromApi } from "@/api/chat.api";
import { formatClock } from "@/helpers/formatClock";
import {
  addJustReadMessageIds,
  addReactionToMessage,
} from "@/lib/redux/messageSlice";
import { RootState } from "@/lib/redux/store";
import { useFloating } from "@floating-ui/react";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import OtherMessageReactions from "./OtherMessageReactions";

interface Props {
  message: TFetchMessageFromApi;
}

export default function OtherMessage({ message }: Props) {
  const clock = formatClock(message.sentAt);
  const dispatch = useDispatch();
  const { currChat } = useSelector((state: RootState) => state.chat);
  const { user: authUser } = useSelector((state: RootState) => state.auth);

  const { refs, floatingStyles } = useFloating({
    placement: "right-start",
    strategy: "fixed",
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      dispatch(addJustReadMessageIds(message.id));
    }
  }, [inView]);

  const [open, setOpen] = useState(false);

  const onReactionClick = async (emoji: EmojiClickData) => {
    if (!authUser) return;
    dispatch(
      addReactionToMessage({
        id: Math.ceil(Math.random() * 10000000),
        emoji: emoji.emoji,
        messageId: message.id,
        user: authUser,
      })
    );
    setOpen(false);
    await giveReactionToMessageApi(emoji.emoji, emoji.unified, message.id);
  };

  if (!currChat) return null;

  return (
    <Stack
      direction="row"
      component="div"
      position="relative"
      ref={ref}
      gap={1}
      alignSelf="start"
    >
      <div ref={refs.setFloating} style={floatingStyles}>
        <EmojiPicker
          open={open}
          theme={Theme.DARK}
          reactionsDefaultOpen={true}
          allowExpandReactions={false}
          onReactionClick={onReactionClick}
          hiddenEmojis={message.reactions.map((r) => r.value)}
        />
      </div>
      {currChat.isGroup && (
        <Avatar
          src={message.user.imageURL ?? undefined}
          alt={message.user.username}
          sx={{ width: 24, height: 24 }}
        />
      )}
      <Box>
        <Stack direction="row" gap={1}>
          <Stack position="relative" direction="column">
            <Box
              sx={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "0.5rem 0.5rem 0.5rem 0",
                position: "relative",
                maxWidth: 400,
              }}
              px={2}
              py={1}
              height="max-content"
            >
              <Typography>{message.content}</Typography>
            </Box>
            <OtherMessageReactions reactions={message.reactions} />
          </Stack>
          <Stack direction="column" alignSelf="start">
            <IconButton
              ref={refs.setReference}
              onClick={() => setOpen((val) => !val)}
            >
              <EmojiEmotions color="disabled" />
            </IconButton>
            <Typography color="textDisabled" fontSize="0.7rem">
              {clock}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
