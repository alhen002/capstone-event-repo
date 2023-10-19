import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl";
import { useRef, useState, useEffect } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map({ location = {} }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(location.lng);
  const [lat, setLat] = useState(location.lat);
  const [zoom, setZoom] = useState(location.zoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lat, lng, zoom]);

  return (
    <div style={{ height: "500px" }}>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        style={{ height: "500px" }}
        ref={mapContainer}
        className="map-container"
      />
    </div>
  );
}