export default async function getCoordinates(address) {
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const encodedAddress = encodeURIComponent(address);
  const geocodingEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxAccessToken}`;
  const response = await fetch(geocodingEndpoint);
  const data = await response.json();
  const coordinates = data.features[0].center;
  const object = {
    lng: coordinates[0],
    lat: coordinates[1],
  };
  return object;
}
