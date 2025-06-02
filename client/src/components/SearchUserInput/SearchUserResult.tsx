import { RootState } from "@/lib/redux/store";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";
import SearchResultUserCard from "./SearchResultUserCard";

type Props = {
  setChatError: Dispatch<SetStateAction<string>>;
};

const SearchUserResult = ({ setChatError }: Props) => {
  const { searchResult } = useSelector((state: RootState) => state.user);
  return (
    <Stack flex="1" overflow={"auto"} direction={"column"}>
      <Divider textAlign="left">
        <Typography variant="subtitle2" color="textDisabled">
          Search Result
        </Typography>
      </Divider>
      {searchResult.map((user) => (
        <SearchResultUserCard
          setChatError={setChatError}
          key={user.id}
          user={user}
        />
      ))}
    </Stack>
  );
};

export default SearchUserResult;
