import { Box, Typography } from "@mui/material";
import Logo from "@/assets/bb.svg";

export default function Banner() {
  return (
    <Box
      height="inherit"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={2}
    >
      <img style={{ width: "10rem" }} src={Logo} alt="banner" />
      <Typography color="textDisabled" variant="h4">
        Messenger
      </Typography>
    </Box>
  );
}
