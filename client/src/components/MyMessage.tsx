import DoneAll from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function MyMessage() {
  return (
    <Stack alignSelf="end">
      <Container maxWidth="sm">
        <Stack gap={1} alignItems="end" direction="row">
          <Stack direction="column" gap={-0.5}>
            <Typography color="textDisabled" fontSize="0.7rem">
              22:00
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
            <Typography>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}