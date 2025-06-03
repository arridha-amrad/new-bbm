import EmojiEmotions from "@mui/icons-material/EmojiEmotions";
import IconButton from "@mui/material/IconButton";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useState } from "react";

export default function ReactionPicker() {
  const [open, setOpen] = useState(false);
  const openPicker = () => {
    setOpen(true);
  };
  const closePicker = () => {
    setOpen(false);
  };

  const onReactionClick = () => {
    closePicker();
  };
  return (
    <IconButton
      onClick={() => setOpen((val) => !val)}
      sx={{ position: "relative" }}
    >
      <EmojiEmotions color="disabled" />
      <EmojiPicker
        open={open}
        theme={Theme.DARK}
        reactionsDefaultOpen={true}
        allowExpandReactions={false}
        onReactionClick={onReactionClick}
      />
    </IconButton>
  );
}
