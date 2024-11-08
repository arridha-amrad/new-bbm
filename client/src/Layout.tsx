import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Outlet, useLoaderData } from "react-router-dom";
import { setAuth, TUser } from "./lib/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { RootState } from "./lib/redux/store";
import { getSocket } from "./lib/socket";

export default function Layout() {
  const data = useLoaderData() as TUser;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const socket = getSocket();
  const ref = useRef(true);

  useEffect(() => {
    if (data && ref.current) {
      socket?.emit("addUser", {
        username: data.username,
        userId: data.id,
      });
      ref.current = false;
      dispatch(setAuth(data));
    }
  }, []);

  return (
    <Container>
      <Paper>
        <Stack sx={{ height: "100vh" }} overflow={"hidden"} direction="row">
          {isLoading ? <p>loading</p> : <Outlet />}
        </Stack>
      </Paper>
    </Container>
  );
}
