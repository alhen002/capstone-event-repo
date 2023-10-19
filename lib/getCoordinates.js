export default async function getCoordinates({ address }) {
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const encodedAddress = encodeURIComponent(address);
  const geocodingEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/Jungfernstieg.json?access_token=pk.eyJ1IjoiZmVsLXNhZCIsImEiOiJjbG53eDd4dDIwZjQ3MmpxbXVwajQzcDljIn0.REfUJV0_gsq29UrKRxvoRA`;
  const response = await fetch(geocodingEndpoint);
  const data = await response.json();
  const coordinates = data.features[0].center;
  const object = {
    lng: coordinates[0],
    lat: coordinates[1],
  };
  return object;
}

//https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json
