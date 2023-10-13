export default function getDate(date) {
  const eventDate = new Date(date);

  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString("default", {
    month: "short",
  });

  const hours = eventDate.getHours();
  const minutes = eventDate.getUTCMinutes();
  const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

  const formattedDate = eventDate.toISOString().slice(0, 16);
  const year = eventDate.getFullYear();

  return {
    day,
    formattedDate,
    month,
    year,
    time,
  };
}
