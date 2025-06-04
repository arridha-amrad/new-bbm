import { TSearchUserResultFromApi } from "@/api/user.api";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isLoadingSearchUser: boolean;
  searchResult: TSearchUserResultFromApi[];
  selectedUsers: TSearchUserResultFromApi[];
  deleteFromSelectedUsers: (userId: number) => void;
  setSelectedUsers: Dispatch<SetStateAction<TSearchUserResultFromApi[]>>;
};

export default function SearchUserResult({
  isLoadingSearchUser,
  searchResult,
  selectedUsers,
  deleteFromSelectedUsers,
  setSelectedUsers,
}: Props) {
  const checkIsUserSelected = (user: TSearchUserResultFromApi) => {
    return !!selectedUsers.find((u) => u.id === user.id);
  };

  return (
    <Stack height={300} direction="column" gap={2}>
      {isLoadingSearchUser ? (
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
        searchResult.map((user) => (
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
  );
}
