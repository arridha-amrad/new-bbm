import EmojiPickerReact, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";
import { Dispatch, RefObject, SetStateAction } from "react";

export type TEmojiProps = {
  setText: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  cursorPosition: RefObject<number>;
};

type Props = {
  open: boolean;
} & TEmojiProps;

export default function EmojiPicker({
  inputRef,
  open,
  setText,
  cursorPosition,
}: Props) {
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (inputRef.current === null) return;
    const pos = cursorPosition.current;
    const ref = inputRef.current;

    setText((prev) => {
      const start = prev.slice(0, pos);
      const end = prev.slice(pos);
      const newText = start + emojiData.emoji + end;
      return newText;
    });

    const newCursorPos = pos + emojiData.emoji.length;
    cursorPosition.current = newCursorPos;

    setTimeout(() => {
      ref.focus();
      ref.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="size-max shrink-0">
      <EmojiPickerReact
        suggestedEmojisMode={SuggestionMode.RECENT}
        previewConfig={{ showPreview: false }}
        theme={Theme.DARK}
        onEmojiClick={handleEmojiClick}
        open={open}
        className="custom-scrollbar"
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
  );
}
