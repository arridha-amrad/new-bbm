import Contacts from "@mui/icons-material/Contacts";
import Forum from "@mui/icons-material/Forum";
import Settings from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from "react-router-dom";

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isContactPath = pathname === "/contacts";
  const isChatPage = pathname === "/";
  const isSettingsPage = pathname === "/settings";

  return (
    <Paper>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        sx={{ py: 1 }}
        direction={"row"}
      >
        <IconButton onClick={() => navigate("/contacts")} size="large">
          <Contacts color={isContactPath ? "action" : "disabled"} />
        </IconButton>
        <IconButton onClick={() => navigate("/")} size="large">
          <Badge badgeContent={6} color="info">
            <Forum color={isChatPage ? "action" : "disabled"} />
          </Badge>
        </IconButton>
        <IconButton onClick={() => navigate("/settings")} size="large">
          <Settings color={isSettingsPage ? "action" : "disabled"} />
        </IconButton>
      </Stack>
    </Paper>
  );
}