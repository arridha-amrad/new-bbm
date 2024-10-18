import { TMessage } from "@/lib/redux/messageSlice";
import { formatClock } from "@/utils";
import DoneAll from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  message: TMessage;
}

export default function MyMessage({ message }: Props) {
  const clock = formatClock(message.sentAt);
  return (
    <Stack alignSelf="end">
      <Container maxWidth="sm">
        <Stack gap={1} alignItems="end" direction="row">
          <Stack direction="column" gap={-0.5}>
            <Typography color="textDisabled" fontSize="0.7rem">
              {clock}
            </Typography>
            <DoneAll color="disabled" sx={{ width: "1.2rem" }} />
          </Stack>
          <Box
            sx={{
              background: "rgba(41,182,246,1)",
              borderRadius: "0.5rem 0.5rem 0rem 0.5rem",
            }}
            px={2}
            py={1}
          >
            <Typography>{message.content}</Typography>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}
