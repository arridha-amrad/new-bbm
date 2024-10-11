import Stack from "@mui/material/Stack";
import MyMessage from "./MyMessage";
import OtherMessage from "./OtherMessage";

export default function Messages() {
  return (
    <Stack padding={2} flex={"1"} gap={2} overflow={"auto"}>
      <MyMessage />
      <OtherMessage />
      <OtherMessage />
      <MyMessage />
      <OtherMessage />
      <MyMessage />
      <OtherMessage />
      <MyMessage />
      <OtherMessage />
      <MyMessage />
      <OtherMessage />
      <MyMessage />
      <OtherMessage />
    </Stack>
  );
}
