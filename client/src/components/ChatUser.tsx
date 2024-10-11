import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ChatUser() {
  return (
    <Stack alignItems={"center"} direction={"row"} gap={1} py={1} px={2}>
      <Avatar />
      <Stack>
        <Typography fontWeight={"700"}>Büsra</Typography>
        <Typography
          lineHeight={0.9}
          variant="body2"
          color="textDisabled"
          fontStyle={"italic"}
        >
          Last seen 22:00
        </Typography>
      </Stack>
    </Stack>
  );
}
