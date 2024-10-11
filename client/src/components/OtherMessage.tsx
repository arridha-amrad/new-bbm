import DoneAll from "@mui/icons-material/DoneAll";
import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import { Container, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function OtherMessage() {
  return (
    <Stack alignSelf="start">
      <Container maxWidth="sm">
        <Stack direction="row" gap={1}>
          <Box
            sx={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: "0.5rem 0.5rem 0.5rem 0",
            }}
            px={2}
            py={1}
          >
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur minima quod cupiditate, commodi delectus ullam officia
              nostrum. Minima impedit similique amet, ullam necessitatibus error
              voluptatum beatae explicabo. Placeat obcaecati enim sequi possimus
              illo iusto odit modi! Accusamus accusantium labore culpa mollitia.
              Non iure vitae maiores doloribus porro debitis. Aut unde,
              exercitationem cumque incidunt dolor alias odio iste nostrum hic.
              Rem perferendis dolorum vero deleniti provident. Vel, libero
              accusamus sunt doloribus fugiat amet aut dolores autem. Fuga
              deleniti aliquam dicta vel. Reiciendis non quo, rerum corrupti
              deserunt fugiat rem dicta, deleniti quibusdam impedit, ipsam illo
              possimus? Ducimus dolorum aliquam incidunt consectetur.
            </Typography>
          </Box>
          <Stack direction="column" alignSelf="end">
            <IconButton>
              <EmojiEmotions color="disabled" />
            </IconButton>
            <Typography color="textDisabled" fontSize="0.7rem">
              22:00
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
