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

export async function updateEvent(id, data) {
  return request({ url: `/api/events/${id}`, method: "PUT", data });
}

export async function toggleAttending(id) {
  return request({ url: `/api/events/${id}/attend`, method: "PUT" });
}

export async function createNewEvent(data) {
  return request({ url: "/api/events", method: "POST", data });
}

export async function deleteEvent(id) {
  return request({ url: `/api/events/${id}`, method: "DELETE" });
}

const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );
    const { url, width, height } = await response.json();
    return { url, width, height };
}