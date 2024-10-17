import Chats from "@/components/Chats";
import Search from "@/components/Search";
import TabBar from "@/components/TabBar";
import User from "@/components/User";
import { RootState } from "@/lib/redux/store";
import { CreateOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function Home() {
  const { searchResult, searchActive } = useSelector(
    (state: RootState) => state.user
  );
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
            <Stack flex="1" overflow={"auto"} direction={"column"}>
              <Divider textAlign="left">
                <Typography variant="subtitle2" color="textDisabled">
                  Search Result
                </Typography>
              </Divider>
              {searchResult.map((user) => (
                <User key={user.id} user={user} />
              ))}
            </Stack>
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
    </>
  );
}
