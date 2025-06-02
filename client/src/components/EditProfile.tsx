import { editProfileApi } from "@/api/user.api";
import { updateAuth } from "@/lib/redux/authSlice";
import { RootState } from "@/lib/redux/store";
import { TEditProfile, editProfileSchema } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Container, Snackbar, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<TEditProfile>({
    resolver: zodResolver(editProfileSchema),
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await editProfileApi(data);
      if (res.status < 400) {
        dispatch(updateAuth(res.data));
        setIsOpen(true);
        setMessage("Profile updated successfully");
      }
    } catch (err: any) {
      console.log(err);
      const errMessage = err.response.data.message;
      if (errMessage) {
        setIsOpen(true);
        setMessage(errMessage);
      }
    }
  });

  return (
    <fieldset style={{ outline: "none", border: "none" }} disabled={isLoading}>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isOpen}
        autoHideDuration={5000}
        onClose={() => setIsOpen(false)}
        message={message}
      />
      <Stack p={1} direction="row" justifyContent="space-between">
        <Button onClick={() => navigate(-1)} startIcon={<ChevronLeft />}>
          Back
        </Button>
        <Typography pt={0.7} fontWeight="700">
          Edit Profile
        </Typography>
        <Button onClick={() => formRef.current?.requestSubmit()}>Done</Button>
      </Stack>
      <Divider />
      <Box px={2} py={2}>
        <Container maxWidth="xs">
          <Stack direction="column" alignItems="center" gap={1}>
            <Avatar src={user?.imageURL} sx={{ width: 100, height: 100 }} />
            <Stack
              ref={formRef}
              onSubmit={onSubmit}
              component="form"
              width="100%"
              gap={1}
            >
              <TextField
                id="edit-profile-username"
                disabled={isLoading}
                error={!!errors.username}
                helperText={errors.username?.message}
                {...register("username", { value: user?.username })}
                label="Username"
                variant="standard"
                size="small"
              />
              <TextField
                aria-readonly={true}
                value={user?.email}
                label="Email"
                variant="standard"
                size="small"
                disabled
              />
              <TextField
                id="edit-profile-imageURL"
                disabled={isLoading}
                error={!!errors.imageURL}
                helperText={errors.imageURL?.message}
                {...register("imageURL", { value: user?.imageURL })}
                label="Avatar Url"
                variant="standard"
                size="small"
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </fieldset>
  );
};

export default EditProfile;
