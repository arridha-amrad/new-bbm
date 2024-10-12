import { RootState } from "@/lib/redux/store";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { Container, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState(user?.username ?? "");
  const [url, setUrl] = useState(user?.imageURL ?? "");
  return (
    <>
      <Stack p={1} direction="row" justifyContent="space-between">
        <Button startIcon={<ChevronLeft />}>Back</Button>
        <Typography pt={0.7} fontWeight="700">
          Edit Profile
        </Typography>
        <Button>Done</Button>
      </Stack>
      <Divider />
      <Box px={2} py={2}>
        <Container maxWidth="xs">
          <Stack direction="column" alignItems="center" gap={1}>
            <Avatar sx={{ width: 100, height: 100 }} />
            <Stack width="100%" gap={1}>
              <TextField
                value={username}
                label="Username"
                variant="standard"
                size="small"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                value={user?.email}
                label="Email"
                variant="standard"
                size="small"
                disabled
              />
              <TextField
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                label="Avatar Url"
                variant="standard"
                size="small"
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default EditProfile;
