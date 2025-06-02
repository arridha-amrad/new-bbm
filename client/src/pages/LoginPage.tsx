import { loginApi } from "@/api/auth.api";
import { setAccessToken } from "@/lib/axios";
import { loginSchema, TLogin } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { urls } from "./urls";

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
      setAccessToken(res.data.accessToken);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      const errMessage = err.response.data.message;
      if (errMessage) {
        setError(errMessage);
      }
    }
  });

  return (
    <Paper sx={{ padding: "3rem 2rem", borderRadius: "0.5rem", width: "100%" }}>
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
            <Link to={urls.signup} component={ReactLink}>
              register
            </Link>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}
