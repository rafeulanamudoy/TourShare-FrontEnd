export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${dateString} at ${timeString}`;
};
export const formatTimeDifference = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) {
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  }
  if (hours > 0) {
    if (hours === 1) return "1 hour ago";
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    if (minutes === 1) return "1 minute ago";
    return `${minutes} minutes ago`;
  }
  if (seconds === 1) return "1 second ago";
  return `${seconds} seconds ago`;
};
