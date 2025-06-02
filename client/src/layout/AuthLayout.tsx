import Logo from "@/assets/bb.svg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <Container maxWidth="xs">
      <Stack
        width="100%"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={4}
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            flexDirection="column"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
              sx={{ padding: "1rem", width: "100%" }}
            >
              <img src={Logo} alt="bb" />
              <Typography variant="h5" fontWeight="500">
                Messenger
              </Typography>
            </Box>
          </Box>
          <Outlet />
        </Box>
        <Box
          padding="1rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>Crafted by Arridha Amrad</Typography>
        </Box>
      </Stack>
    </Container>
  );
}
