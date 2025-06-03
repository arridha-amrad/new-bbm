import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { searchUserApi, TSearchUserResultFromApi } from "@/api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResult } from "@/lib/redux/userSlice";
import { RootState } from "@/lib/redux/store";
import { initNewChat } from "@/lib/redux/chatSlice";

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<TSearchUserResultFromApi[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<
    TSearchUserResultFromApi[]
  >([]);

  const checkIsUserSelected = (user: TSearchUserResultFromApi) => {
    return !!selectedUsers.find((u) => u.id === user.id);
  };

  const [key, setKey] = useState("");
  const [value, { isPending }] = useDebounce(key, 500);
  useEffect(() => {
    if (!!value) {
      setLoading(true);
      searchUserApi(value)
        .then(({ data }) => {
          setUsers(data.users.filter((u) => u.id !== authUser?.id));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [value]);

  const deleteFromSelectedUsers = (userId: number) => {
    setSelectedUsers((v) => v.filter((user) => user.id !== userId));
  };

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

  return (
    <>
      <IconButton onClick={handleClickOpen} title="Create group chat">
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

            <Stack height={300} direction="column" gap={2}>
              {loading || isPending() ? (
                <Box
                  width="100%"
                  height="100%"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <CircularProgress />
                </Box>
              ) : (
                users.map((user) => (
                  <Box
                    key={user.id}
                    width="100%"
                    display={"flex"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <Avatar src={user.imageURL ?? undefined} />
                    <Typography flex={1}>{user.username}</Typography>
                    <Checkbox
                      onChange={() => {
                        if (checkIsUserSelected(user)) {
                          deleteFromSelectedUsers(user.id);
                        } else {
                          setSelectedUsers((v) => [...v, user]);
                        }
                      }}
                      checked={checkIsUserSelected(user)}
                    />
                  </Box>
                ))
              )}
            </Stack>
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
