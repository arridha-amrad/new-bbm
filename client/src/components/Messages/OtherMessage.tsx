import { addJustReadMessageIds, TMessage } from "@/lib/redux/messageSlice";
import { formatClock } from "@/helpers/formatClock";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import { Container, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  message: TMessage;
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
    <Stack component="div" ref={ref} alignSelf="start">
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
            <IconButton>
              <EmojiEmotions color="disabled" />
            </IconButton>
            <Typography color="textDisabled" fontSize="0.7rem">
              {clock}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
