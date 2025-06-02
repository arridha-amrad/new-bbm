import Account from "@/components/Account";
import Search from "@/components/SearchUserInput";
import TabBar from "@/components/TabBar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export default function SettingsPage() {
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
              <Typography fontWeight={"700"}>Settings</Typography>
            </Box>
            <Button>Edit</Button>
          </Stack>
          <Search />
          <Divider />
          <Stack flex="1">
            <Account />
          </Stack>
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
