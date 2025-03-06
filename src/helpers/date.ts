export function formatTimestamp(timestamp: string | number): string {
  const date = new Date(Number(timestamp)); // Convert to number in case it's a string

  if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid timestamp

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}