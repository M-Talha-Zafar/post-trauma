export const randomId = () => {
  return Math.random().toString(36);
};

export const truncateTitle = (title, limit) => {
  const words = title.split(" ");
  const truncatedTitle = words.slice(0, limit).join(" ");
  return truncatedTitle;
};
