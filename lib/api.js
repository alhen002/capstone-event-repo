async function request({ data, url, method }) {
  const options = data
    ? {
        method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    : { method };
  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}

export async function createNewEvent(data) {
  return request({ url: "/api/events", method: "POST", data });
}

export async function deleteEvent(id) {
  return request({ url: `/api/events/${id}`, method: "DELETE" });
}
