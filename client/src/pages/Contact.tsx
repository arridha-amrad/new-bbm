import Chats from "@/components/RecentChats";
import Search from "@/components/SearchUserInput";
import { PersonAdd } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TabBar from "@/components/TabBar";
import { Outlet } from "react-router-dom";

export default function ChatLayout() {
  return (
    <>
      <Box height={"inherit"} flex="1">
        <Stack height={"inherit"} display={"flex"} direction={"column"}>
          <Stack
            sx={{ padding: "0.5rem" }}
            alignItems={"center"}
            direction={"row"}
          >
            <Box display={"flex"} justifyContent="center" flex="1">
              <Typography fontWeight={"700"}>Contact</Typography>
            </Box>
            <IconButton>
              <PersonAdd color="info" />
            </IconButton>
          </Stack>
          <Search />
          <Divider />
          <Chats />
          <Divider />
          <TabBar />
        </Stack>
      </Box>
      <Divider sx={{ minHeight: "100vh" }} orientation="vertical" />
      <Box height={"inherit"} flex="2">
        <Outlet />
      </Box>
    </>
  );
}
