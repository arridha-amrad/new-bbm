import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RequireAuthLayout from "./layout/RequireAuthLayout";
import ChatPage from "./pages/ChatPage";
import HomePage from "./layout/ChatLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Banner from "./components/Banner";
import { urls } from "./pages/urls";
import SettingsPage from "./pages/Settings";

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
          <Route element={<HomePage />}>
            <Route index element={<Banner />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route path={urls.settings} element={<SettingsPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
