import { TMessageReaction } from "@/api/chat.api";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  reactions: TMessageReaction[];
};

export default function OtherMessageReactions({ reactions }: Props) {
  return (
    <Stack direction="row">
      {reactions.map((r, i) => (
        <Stack key={i} direction="column" alignItems="center">
          <Typography>{r.value}</Typography>
          <AvatarGroup spacing="small">
            {r.users.map((user, i) => (
              <Avatar
                key={i}
                src={user.imageURL ?? undefined}
                sx={{ width: 15, height: 15 }}
                alt={user.username}
              />
            ))}
          </AvatarGroup>
        </Stack>
      ))}
    </Stack>
  );
}
