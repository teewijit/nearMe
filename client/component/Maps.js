import { useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Button from "./Button";
import Router from "next/router";

const libraries = ["places"];

const center = {
  lat: 13.746556236294557,
  lng: 100.48752786776292,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAVlswadgjqNUCu30R5fqTC1xKLaFQXjtY",
    libraries,
  });
  const [marker, setMarker] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchBox, setSearchBox] = useState(null);
  const mapRef = useRef();

  const onMapClick = (event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleButtonClick = () => {
    if (marker) {
      const { lat, lng } = marker;
      const url = `/store?lat=${lat}&lng=${lng}`;
      Router.push(url);
    }
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const { geometry } = places[0];
      if (geometry && geometry.location) {
        const { lat, lng } = geometry.location;
        setMarker({ lat: lat(), lng: lng() });
        mapRef.current.panTo({ lat: lat(), lng: lng() });
      }
    }
  };

  const handleSearchBoxLoad = (ref) => setSearchBox(ref);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GoogleMap
          mapContainerStyle={{ height: "80vh", width: "100%", marginBottom: 20 }}
          zoom={15}
          center={center}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
        </GoogleMap>
        <div style={{ position: "absolute", top: 10, left: 500, zIndex: 1 }}>
          <StandaloneSearchBox
            onLoad={handleSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              className="form-control"
              type="text"
              placeholder="Search places"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </StandaloneSearchBox>
        </div>

        {marker && (
          <Button
            label={"Sent"}
            variant="primary"
            onClick={handleButtonClick}
          />
        )}
      </div>
    </>
  );
}
