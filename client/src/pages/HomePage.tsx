import Chats from "@/components/Chats";
import Search from "@/components/Search";
import SearchUserResult from "@/components/SearchUserResult";
import TabBar from "@/components/TabBar";
import { RootState } from "@/lib/redux/store";
import { CreateOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  const { searchResult, searchActive } = useSelector(
    (state: RootState) => state.user
  );

  const [chatError, setChatError] = useState("");

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
              <Typography fontWeight={"700"}>Chats</Typography>
            </Box>
            <IconButton>
              <CreateOutlined color="info" />
            </IconButton>
          </Stack>
          <Search />
          {searchActive && searchResult.length > 0 ? (
            <SearchUserResult setChatError={setChatError} />
          ) : (
            <Chats />
          )}
          <Divider />
          <TabBar />
        </Stack>
      </Box>
      <Divider sx={{ minHeight: "100vh" }} orientation="vertical" />
      <Box height={"inherit"} flex="2">
        <Outlet />
      </Box>
      <Snackbar
        open={!!chatError}
        autoHideDuration={3000}
        onClose={() => setChatError("")}
        message={chatError}
      />
    </>
  );
}
