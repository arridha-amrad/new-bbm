import { useAuthCheck } from "@/hooks/useAuthCheck";
import { Box, CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

export default function RequireAuthLayout() {
  const loading = useAuthCheck();
  if (loading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  return (
    <Container>
      <Paper>
        <Stack sx={{ height: "100vh" }} overflow={"hidden"} direction="row">
          <Outlet />
        </Stack>
      </Paper>
    </Container>
  );
}
