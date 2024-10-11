import Add from "@mui/icons-material/Add";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import Send from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";

export default function CreateMessageForm() {
  return (
    <Stack sx={{ py: 1.5, px: 1 }} direction={"row"} gap={1} alignItems={"end"}>
      <IconButton type="button" aria-label="search">
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
          fullWidth
          multiline
          maxRows={3}
          sx={{ flex: "1", pl: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Box>
      <IconButton>
        <Add color="disabled" />
      </IconButton>
      <IconButton>
        <Send color="disabled" />
      </IconButton>
    </Stack>
  );
}
