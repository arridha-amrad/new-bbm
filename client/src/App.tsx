import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import AuthLayout from "./layout/AuthLayout";
import ChatLayout from "./layout/ChatLayout";
import RequireAuthLayout from "./layout/RequireAuthLayout";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { urls } from "./pages/urls";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<RequireAuthLayout />}>
          <Route element={<ChatLayout />}>
            <Route index element={<Banner />} />
            <Route path={urls.chat} element={<ChatPage />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={urls.login} element={<LoginPage />} />
          <Route path={urls.signup} element={<SignupPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
