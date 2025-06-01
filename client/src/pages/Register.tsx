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
import { registerSchema, TRegister } from "@/validators/auth";
import { setToken } from "@/lib/axios";
import { registerApi } from "@/api/auth";

export default function RegisterPage() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await registerApi(data);
      setToken(res.data.accessToken);
      navigate("/");
    } catch (err: any) {
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
          <Paper sx={{ padding: "2rem", borderRadius: "0.5rem" }}>
            <form onSubmit={onSubmit}>
              <Stack gap={3} direction="column">
                {!!error && (
                  <Alert onClose={() => setError("")} severity="error">
                    {error}
                  </Alert>
                )}
                <TextField
                  id="register-email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  type="email"
                  disabled={isLoading}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  id="register-username"
                  label="Username"
                  fullWidth
                  disabled={isLoading}
                  variant="outlined"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  {...register("username")}
                />
                <TextField
                  id="register-imageUrl"
                  label="image url"
                  fullWidth
                  disabled={isLoading}
                  variant="outlined"
                  error={!!errors.imageURL}
                  helperText={errors.imageURL?.message}
                  {...register("imageURL")}
                />
                <Box>
                  <TextField
                    id="register-password"
                    label="Password"
                    fullWidth
                    disabled={isLoading}
                    variant="outlined"
                    type={isShowPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password")}
                  />
                  <FormGroup>
                    <FormControlLabel
                      sx={{ userSelect: "none" }}
                      control={
                        <Checkbox
                          checked={isShowPassword}
                          onChange={() => setIsShowPassword((val) => !val)}
                        />
                      }
                      label="Show Password"
                    />
                  </FormGroup>
                </Box>
                <Button disabled={isLoading} type="submit" variant="contained">
                  Register
                </Button>
                <Box display="flex" justifyContent="center" gap={1}>
                  <Typography>Already have an account ?</Typography>
                  <Link to="/login" component={ReactLink}>
                    Login
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
