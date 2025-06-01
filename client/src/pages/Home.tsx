import Chats from "@/components/Chats";
import Search from "@/components/Search";
import SearchUserResult from "@/components/SearchUserResult";
import TabBar from "@/components/TabBar";
import { setAuth } from "@/lib/redux/authSlice";
import { setChats } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import { getSocket } from "@/lib/socket";
import { THomeLoader } from "@/loaders";
import { CreateOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLoaderData } from "react-router-dom";

export default function Home() {
  const { searchResult, searchActive } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();

  const socket = getSocket();

  const data = useLoaderData() as THomeLoader;

  useEffect(() => {
    dispatch(setAuth(data.user));
    socket?.emit("addUser", {
      username: data.user.username,
      userId: data.user.id,
    });
    dispatch(setChats(data.chats));
  }, [data]);

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
