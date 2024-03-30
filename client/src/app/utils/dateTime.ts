function formatDateTime(time: string): string {
  const now = new Date();
  const date = new Date(time);

  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const formatDate = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString("en", {
    dateStyle: "medium",
  });
};

export { formatDateTime, formatDate };
