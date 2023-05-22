import { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { Card, Button, Form } from "react-bootstrap";

const libraries = ["places"];

export default function MapAll({ coordinates }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAVlswadgjqNUCu30R5fqTC1xKLaFQXjtY",
    libraries,
  });
  const [marker, setMarker] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchBox, setSearchBox] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (isLoaded) {
      const markers = coordinates.map((marker) => ({
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
        storeName: marker.storeName,
        storeAddress: marker.storeAddress,
        storeDetail: marker.storeDetail,
        storeTel: marker.tel,
        storeOpen: marker.open,
        storeClose: marker.close,
        storeImg: "./" + marker.storeImg,
        isvet: marker.isvet,
      }));
      setMarker(markers);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (mapCenter) {
      mapRef.current.panTo(mapCenter);
    }
  }, [mapCenter]);

  const onLoad = (map) => {
    mapRef.current = map;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.log("Error: The Geolocation service failed.");
      }
    );
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const { geometry } = places[0];
      if (geometry && geometry.location) {
        const { lat, lng } = geometry.location;
        setMapCenter({ lat: lat(), lng: lng() });
        mapRef.current.panTo({ lat: lat(), lng: lng() });
      }
    }
  };
  const handleSearchBoxLoad = (ref) => setSearchBox(ref);
  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <GoogleMap
          mapContainerStyle={{
            height: "80vh",
            width: "100%",
            marginBottom: 20,
          }}
          zoom={15}
          center={mapCenter}
          onLoad={onLoad}
        >
          {marker.map((marker, index) => (
            <Marker
              key={index}
              icon={{
                url: marker.isvet === 0 ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png" : "./manage.png",
                size: new window.google.maps.Size(60, 60),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(30, 60),
                scaledSize: new window.google.maps.Size(60, 60),
              }}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelectedMarker(marker);
              }}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <Card style={{ width: "18rem", border: "none" }}>
                <Card.Img
                  variant="top"
                  src={selectedMarker.storeImg}
                  style={{ width: "100%", height: "14rem" }}
                />
                <Card.Body>
                  <Card.Title>{selectedMarker.storeName}</Card.Title>
                  <Card.Text className="mb-1">
                    Address: {selectedMarker.storeAddress}
                  </Card.Text>
                  <Card.Text className="mb-1">
                    Description: {selectedMarker.storeDetail}
                    Description: {selectedMarker.isvet}
                  </Card.Text>
                  <Card.Text className="mb-1">
                    Time: {selectedMarker.storeOpen} {" - "}
                    {selectedMarker.storeClose}
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-between align-items-center">
                    Tel: {selectedMarker.storeTel}
                    <Button
                      variant="primary"
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${selectedMarker.lat},${selectedMarker.lng}`
                        )
                      }
                    >
                      Open Map
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </InfoWindow>
          )}
        </GoogleMap>
        <div style={{ position: "absolute", top: 10, left: 500, zIndex: 1 }}>
          <StandaloneSearchBox
            onLoad={handleSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <Form.Control
              type="text"
              placeholder="Search places"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="my-custom-class"
            />
          </StandaloneSearchBox>
        </div>
      </div>
    </>
  );
}
