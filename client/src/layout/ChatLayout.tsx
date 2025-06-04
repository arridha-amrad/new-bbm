import ModalCreateGroupChat from "@/components/ModalCreateNewChat";
import RecentChats from "@/components/RecentChats";
import TabBar from "@/components/TabBar";
import useFetchUserChats from "@/hooks/useFetchUserChats";
import { RootState } from "@/lib/redux/store";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AuthenticatedUserCard from "./ChatLayout/AuthenticatedUserCard";

export default function ChatLayout() {
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const [chatError, setChatError] = useState("");

  const loadingChat = useFetchUserChats();

  if (!authUser) return null;

  return (
    <>
      <Box height={"inherit"} width="400px">
        <Stack height={"inherit"} display={"flex"} direction={"column"}>
          <AuthenticatedUserCard />
          {loadingChat ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              paddingTop="0.5rem"
            >
              <CircularProgress />
            </Box>
          ) : (
            <RecentChats />
          )}
          <Divider />
          {/* <TabBar /> */}
        </Stack>
      </Box>
      <Divider orientation="vertical" />
      <Box height={"inherit"} flex="1">
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
