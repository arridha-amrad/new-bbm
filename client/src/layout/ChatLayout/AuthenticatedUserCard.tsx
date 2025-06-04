import ModalCreateNewChat from "@/components/ModalCreateNewChat";
import { RootState } from "@/lib/redux/store";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export default function AuthenticatedUserCard() {
  const { user: authUser } = useSelector((state: RootState) => state.auth);

  if (!authUser) return null;
  return (
    <Stack
      position="relative"
      direction="row"
      alignItems="center"
      gap={2}
      padding={2}
    >
      <Box position="absolute" right={2} top={2}>
        <ModalCreateNewChat />
      </Box>
      <Avatar
        src={authUser.imageURL ?? undefined}
        alt={authUser.username}
        sx={{ width: 80, height: 80 }}
      />
      <Stack>
        <Typography fontWeight="500" variant="h5">
          {authUser.username}
        </Typography>
        <Typography>{authUser.email}</Typography>
      </Stack>
    </Stack>
  );
}
