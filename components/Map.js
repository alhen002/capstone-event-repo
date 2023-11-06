import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  height: 200px;
  border: 1px solid var(--primary);
  border-radius: 12px;
  margin-top: 2rem;
`;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map({ posLng = -70.9, posLat = 42.35 }) {
  const [lng, setLng] = useState(posLng);
  const [lat, setLat] = useState(posLat);
  const [zoom, setZoom] = useState(14);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) map.current.resize();
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    }).resize();

    map.current.on("load", function () {
      map.current.resize();
    });

    marker.current = new mapboxgl.Marker({
      color: `var(--primary)`,
      draggable: false,
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    map.current.setCenter([posLng, posLat]);
    marker.current.setLngLat([posLng, posLat]);
    marker.current.addTo(map.current);
  }, [posLng, posLat]);

  return <StyledContainer ref={mapContainer} />;
}
