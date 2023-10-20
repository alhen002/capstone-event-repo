import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl";
import getCoordinates from "@/lib/getCoordinates";
import { useRef, useState, useEffect } from "react";
import { set } from "mongoose";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map({ eventAddress, setCoordinates }) {
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    // map.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!eventAddress) return;
    const marker = new mapboxgl.Marker({
      color: "red",
      draggable: false,
    });

    async function handleFetchCoordinates() {
      const coordinates = await getCoordinates(eventAddress);
      map.current.setCenter([coordinates.lng, coordinates.lat]);
      setCoordinates([coordinates.lng, coordinates.lat]);
      map.current.setZoom(15);
      marker
        .setLngLat([coordinates.lng.toFixed(4), coordinates.lat.toFixed(4)])
        .addTo(map.current);
    }

    handleFetchCoordinates();
    return () => {
      marker.remove();
    };
  }, [eventAddress, setCoordinates]);

  return (
    <div
      style={{ height: "400px" }}
      ref={mapContainer}
      className="map-container"
    />
  );
}
