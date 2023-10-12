export default function getDate(date) {
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString("default", {
    month: "short",
  });
  const hours = eventDate.getHours();
  const minutes = eventDate.getUTCMinutes();
  const time = `${hours}:${minutes < 10 ? minutes + "0" : minutes}`;
  const year = eventDate.getFullYear();

  return {
    day,
    month,
    year,
    time,
  };
}
