import { TSearchUserResultFromApi } from "@/api/user.api";
import useSearchUser from "@/hooks/useSearchUser";
import { initNewChat } from "@/lib/redux/chatSlice";
import { RootState } from "@/lib/redux/store";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchUserResult from "./SearchUserResult";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ModalCreateNewChat() {
  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedUsers, setSelectedUsers] = useState<
    TSearchUserResultFromApi[]
  >([]);

  const { loading, searchResult } = useSearchUser({ key });

  const initChat = () => {
    if (!authUser) return;
    dispatch(
      initNewChat({
        isGroup: selectedUsers.length > 1,
        users: [...selectedUsers, authUser],
      })
    );
    handleClose();
  };

  const deleteFromSelectedUsers = (userId: number) => {
    setSelectedUsers((v) => v.filter((user) => user.id !== userId));
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} title="Create group chat">
        <CreateIcon color="info" />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create New Chat
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ width: "500px" }} dividers>
          <Box marginBottom={4}>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Search User"
              variant="standard"
              onChange={(e) => setKey(e.target.value)}
            />
          </Box>

          <Stack
            direction="row"
            gap={1}
            flexWrap="wrap"
            marginBottom={selectedUsers.length > 0 ? 4 : 0}
          >
            {selectedUsers.map((user) => (
              <Chip
                key={user.id}
                sx={{ width: "max-content" }}
                label={user.username}
                onDelete={() => deleteFromSelectedUsers(user.id)}
              />
            ))}
          </Stack>

          <Box marginBottom={4}>
            <Divider textAlign="center">
              <Chip label="Search result" size="small" />
            </Divider>
            <SearchUserResult
              setSelectedUsers={setSelectedUsers}
              deleteFromSelectedUsers={deleteFromSelectedUsers}
              selectedUsers={selectedUsers}
              searchResult={searchResult}
              isLoadingSearchUser={loading}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={initChat}>
            Chat
          </Button>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
