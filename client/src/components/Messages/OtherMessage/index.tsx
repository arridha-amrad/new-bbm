import { TFetchMessageFromApi } from "@/api/chat.api";
import { formatClock } from "@/helpers/formatClock";
import { addJustReadMessageIds } from "@/lib/redux/messageSlice";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import ReactionPicker from "./ReactionPicker";
import EmojiPicker, { Theme } from "emoji-picker-react";

interface Props {
  message: TFetchMessageFromApi;
}

export default function OtherMessage({ message }: Props) {
  const clock = formatClock(message.sentAt);
  const dispatch = useDispatch();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      dispatch(addJustReadMessageIds(message.id));
    }
  }, [inView]);

  return (
    <Stack component="div" position="relative" ref={ref} alignSelf="start">
      <Box position="absolute" top={-60} left={1}>
        <EmojiPicker
          open={true}
          theme={Theme.DARK}
          reactionsDefaultOpen={true}
          allowExpandReactions={false}
        />
      </Box>
      <Container maxWidth="sm">
        <Stack direction="row" gap={1}>
          <Box
            sx={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: "0.5rem 0.5rem 0.5rem 0",
            }}
            px={2}
            py={1}
          >
            <Typography>{message.content}</Typography>
          </Box>
          <Stack direction="column" alignSelf="end">
            <ReactionPicker />
            <Typography color="textDisabled" fontSize="0.7rem">
              {clock}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
