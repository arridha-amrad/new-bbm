import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Banner from "./components/Banner";
import EditProfile from "./components/EditProfile";
import { useSocket } from "./hooks/useSocket";
import Layout from "./Layout";
import { homeLoader, rootLoader } from "./loaders";
import Chat from "./pages/Chat";
import Account from "./pages/Contact";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Settings from "./pages/Settings";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    loader: rootLoader,
    children: [
      {
        path: "",
        Component: Home,
        loader: homeLoader,
        children: [
          {
            path: "",
            Component: Banner,
          },
          {
            path: "chat",
            Component: Chat,
          },
        ],
      },
      {
        path: "contacts",
        Component: Account,
        children: [
          {
            path: "",
            Component: Banner,
          },
        ],
      },
      {
        path: "settings",
        Component: Settings,
        children: [
          {
            path: "",
            Component: Banner,
          },
          {
            path: "edit-profile",
            Component: EditProfile,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
]);

export default function App() {
  useSocket();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider
        router={router}
        fallbackElement={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        }
      />
    </ThemeProvider>
  );
}
