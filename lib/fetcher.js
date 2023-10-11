export default async function fetcher(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("There was an error while fetching the data.");
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }

  return response.json();
}
