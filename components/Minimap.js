import dynamic from "next/dynamic";
import { placeholderFeature } from "@/lib/utils";
const AddressMinimap = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressMinimap),
  { ssr: false }
);

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Minimap({
  accessToken,
  show,
  feature = placeholderFeature,
  handleUpdateCoords,
}) {
  return (
    <div
      style={{ height: "400px" }}
      id="minimap-container"
      className="map-container"
    >
      <AddressMinimap
        accessToken={mapboxAccessToken}
        show={true}
        feature={feature}
        satelliteToggle={true}
        canAdjustMarker={true}
        keepMarkerCentered={true}
        footer={false}
        onSaveMarkerLocation={(coord) => {
          handleUpdateCoords(coord);
        }}
      />
    </div>
  );
}
