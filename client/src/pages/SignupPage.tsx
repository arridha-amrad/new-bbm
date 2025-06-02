import { registerApi } from "@/api/auth.api";
import { setAccessToken } from "@/lib/axios";
import { registerSchema, TRegister } from "@/validators/auth";
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

export default function SignupPage() {
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
      setAccessToken(res.data.accessToken);
      navigate("/");
    } catch (err: any) {
      const errMessage = err.response.data.message;
      if (errMessage) {
        setError(errMessage);
      }
    }
  });
  return (
    <Paper sx={{ padding: "2rem", borderRadius: "0.5rem", width: "100%" }}>
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
            <Link to={urls.login} component={ReactLink}>
              Login
            </Link>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}
