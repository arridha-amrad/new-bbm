import { RootState } from "@/lib/redux/store";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  const isEditProfilePath = pathname === "/settings/edit-profile";
  return (
    <Paper
      onClick={() => navigate("/settings/edit-profile")}
      component={"div"}
      square
      sx={{
        px: 2,
        py: 2,
        cursor: "pointer",
        background: isEditProfilePath ? "#29b6f61f" : undefined,
      }}
    >
      <Stack gap={2} alignItems="center" direction={"row"}>
        <Avatar
          src={user?.imageURL ?? undefined}
          sx={{ width: 56, height: 56 }}
        />
        <Stack width="100%" direction={"column"}>
          <Typography fontWeight={"700"}>{user?.username}</Typography>
          <Typography color="textSecondary">{user?.email}</Typography>
        </Stack>
        <Box>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}
