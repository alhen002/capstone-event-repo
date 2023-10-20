import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl";
import getCoordinates from "@/lib/getCoordinates";
import { useRef, useState, useEffect } from "react";
import { set } from "mongoose";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map({
  address,
  handleSetCoordinates,
  posLng = -70.9,
  posLat = 42.35,
}) {
  const [lng, setLng] = useState(posLng);
  const [lat, setLat] = useState(posLat);
  const [zoom, setZoom] = useState(9);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    marker.current = new mapboxgl.Marker({
      color: "blue",
      draggable: false,
    });

    marker.current.setLngLat([lng, lat]);
    marker.current.addTo(map.current);
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!address) return;
    async function handleCoordinates() {
      const coordinates = await getCoordinates(address);
      map.current.setCenter([coordinates.lng, coordinates.lat]);
      handleSetCoordinates(coordinates);
      map.current.setZoom(15);
      marker.current
        .setLngLat([coordinates.lng.toFixed(4), coordinates.lat.toFixed(4)])
        .addTo(map.current);
    }

    handleCoordinates();
    return () => {
      marker.current.remove();
    };
  }, [address, handleSetCoordinates]);

  return (
    <div
      style={{ height: "400px" }}
      ref={mapContainer}
      className="map-container"
    />
  );
}
