export default function getDate(date) {
  const eventDate = new Date(date);
  const offsetDate = new Date();
  const offset = offsetDate.getTimezoneOffset();
  const offsetInHours = offset / 60;
  console.log(offset);
  console.log(offsetInHours);

  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString("default", {
    month: "short",
  });
  const monthIndex = eventDate.getMonth();
  const year = eventDate.getFullYear();
  const hours = eventDate.getHours() + offsetInHours;
  const minutes = eventDate.getMinutes();

  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  const dateString = `${year}-${
    monthIndex < 9 ? `0${monthIndex + 1}` : `${monthIndex + 1}`
  }-${day < 9 ? `0${day}` : day}T${time}`;

  return {
    day,
    dateString,
    month,
    year,
    time,
  };
}
