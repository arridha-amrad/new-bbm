import { searchUserApi } from "@/api/user";
import { offSearch, setSearchResult } from "@/lib/redux/userSlice";
import Clear from "@mui/icons-material/Clear";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce";

export default function Search() {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const [value] = useDebounce(key, 500);
  useEffect(() => {
    if (!!value) {
      searchUserApi(value).then(({ data }) => {
        dispatch(setSearchResult(data));
      });
    }
  }, [value]);
  return (
    <Box
      sx={{
        display: "flex",
        mx: 2,
        mb: "0.7rem",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "0.3rem",
      }}
    >
      <IconButton type="button" aria-label="search">
        <SearchOutlined color="disabled" />
      </IconButton>
      <InputBase
        sx={{ flex: "1" }}
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Search"
        inputProps={{ "aria-label": "Search" }}
      />
      <IconButton
        onClick={() => {
          dispatch(offSearch());
          setKey("");
        }}
        type="button"
        aria-label="search"
      >
        <Clear color="disabled" />
      </IconButton>
    </Box>
  );
}
