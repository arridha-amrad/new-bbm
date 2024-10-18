export const formatClock = (date: Date) => {
  const result = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
  return result;
};
