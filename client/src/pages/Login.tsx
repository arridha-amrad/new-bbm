import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Logo from "@/assets/bb.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema, TLogin } from "@/validation/auth";
import { loginApi } from "@/api/auth";
import { setToken } from "@/lib/axios";

export default function LoginPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await loginApi(data);
      if (res.status < 400) {
        setToken(res.data.token);
        navigate("/");
      }
    } catch (err: any) {
      console.log(err);
      const errMessage = err.response.data.message;
      if (errMessage) {
        setError(errMessage);
      }
    }
  });
  return (
    <Container maxWidth="xs">
      <Stack
        width="100%"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={4}
      >
        <Box
          height="100vh - 4rem"
          flex="1"
          display="flex"
          width="100%"
          justifyContent="center"
          flexDirection="column"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            sx={{ padding: "1rem", width: "100%" }}
          >
            <img src={Logo} alt="bb" />
            <Typography variant="h5" fontWeight="500">
              Messenger
            </Typography>
          </Box>
          <Paper sx={{ padding: "3rem 2rem", borderRadius: "0.5rem" }}>
            <form onSubmit={onSubmit}>
              <Stack gap={4} direction="column">
                {!!error && (
                  <Alert onClose={() => setError("")} severity="error">
                    {error}
                  </Alert>
                )}
                <TextField
                  id="login-identity"
                  label="Email or username"
                  fullWidth
                  disabled={isLoading}
                  variant="outlined"
                  {...register("identity")}
                  error={!!errors.identity}
                  helperText={errors.identity?.message}
                />
                <Box>
                  <TextField
                    id="login-password"
                    label="Password"
                    fullWidth
                    disabled={isLoading}
                    variant="outlined"
                    type={isShowPassword ? "text" : "password"}
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                  <FormGroup>
                    <FormControlLabel
                      sx={{ userSelect: "none" }}
                      control={
                        <Checkbox
                          onChange={() => setIsShowPassword((val) => !val)}
                          checked={isShowPassword}
                        />
                      }
                      label="Show Password"
                    />
                  </FormGroup>
                </Box>
                <Button disabled={isLoading} type="submit" variant="contained">
                  Login
                </Button>
                <Box display="flex" justifyContent="center" gap={1}>
                  <Typography>Don't have an account ?</Typography>
                  <Link to="/register" component={ReactLink}>
                    register
                  </Link>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="4rem"
        >
          <Typography>Created by Arridha Amrad</Typography>
          <Stack direction="row" gap={2}>
            <Typography>#humanity_first🇵🇸🇱🇧</Typography>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
