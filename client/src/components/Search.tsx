import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Clear from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";

export default function Search() {
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
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" aria-label="search">
        <Clear color="disabled" />
      </IconButton>
    </Box>
  );
}
