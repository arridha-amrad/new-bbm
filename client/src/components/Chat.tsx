import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  return (
    <Paper
      onClick={() => navigate("/chat?chatId=1")}
      component={"div"}
      square
      sx={{
        px: 2,
        py: 1,
        cursor: "pointer",
        // background: "#29b6f6",
      }}
    >
      <Stack gap={2} direction={"row"}>
        <Avatar sx={{ width: 56, height: 56 }} />
        <Stack direction={"column"}>
          <Typography fontWeight={"700"}>Büsra</Typography>
          <Typography
            color="textSecondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
            accusamus optio saepe facere? Iste rem sit culpa quod? Consequuntur
            quo distinctio laudantium nihil tenetur? Incidunt facere dolores ut
            beatae, delectus officia adipisci? Nulla modi maiores quo qui quia
            eius explicabo facere, accusantium voluptates nisi, necessitatibus
            quisquam blanditiis, est ab? Iusto!
          </Typography>
        </Stack>
        <Stack gap={2} direction={"column"}>
          <Typography color="textDisabled">21:45</Typography>
          <Badge
            sx={{ mr: 2 }}
            badgeContent={10}
            anchorOrigin={{
              horizontal: "right",
            }}
            color="info"
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
