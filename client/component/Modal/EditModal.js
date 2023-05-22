import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Col, Row, Image } from "react-bootstrap";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import styled from "styled-components";
import StoreService from "@/service/StoreService";

const StyleDropzone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  font-size: 18px;
  color: #666;
  height: 100px;
  width: 100%;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const EditModal = ({ id, onClose, show }) => {
  const { data, isLoading, error } = useSelector((state) => state.stores);
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useSelector((state) => state.users);
  // Find the store with the matching id
  const store = data.find((store) => store.id === id);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileFormData, setFileFormData] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFileFormData(acceptedFiles[0]);
    setSelectedImages(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const selected_images = selectedImages?.map((file, index) => (
    <div className="container" key={file.preview}>
      <div className="row justify-content-center text-center">
        <div className="m-2">
          <Button variant={"danger"} onClick={() => removeImage(index)}>
            ลบ
          </Button>
        </div>
        <div className="col-md-6">
          <img src={file.preview} style={{ width: "100%" }} alt="" />
          <label className="mt-2">{file.path}</label>
        </div>
      </div>
    </div>
  ));
  // check if there are any new images selected by the user
  const hasNewImages = selected_images && selected_images.length > 0;

  // display the image
  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  const [marker, setMarker] = useState(null);
  const [newLat, setNewLat] = useState(store.storeLat);
  const [newLng, setNewLng] = useState(store.storeLon);
  const onMapClick = (event) => {
    console.log(newLat);
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setNewLat(event.latLng.lat());
    setNewLng(event.latLng.lng());
  };

  const mapRef = useRef();

  const [showMap, setShowMap] = useState(false);
  // Function to handle the "Show Map" button click event
  const handleShowMap = () => {
    setShowMap(true);
  };
  const handleCloseMap = () => {
    setShowMap(false);
  };
  const center = {
    lat: 13.746556236294557,
    lng: 100.48752786776292,
  };

  const [searchBox, setSearchBox] = useState(null);
  const [searchBoxInput, setSearchBoxInput] = useState(null);
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAVlswadgjqNUCu30R5fqTC1xKLaFQXjtY",
    libraries: ["places"],
  });

  const onMapLoad = (map) => {
    mapRef.current = map;
  };
  useEffect(() => {
    if (isLoaded && searchBoxInput) {
      const searchBox = new window.google.maps.places.SearchBox(searchBoxInput);
      setSearchBox(searchBox);
    }
  }, [isLoaded, searchBoxInput]);

  useEffect(() => {
    if (isLoaded && map) {
      map.addListener("bounds_changed", () => {
        setSearchBoxInput("");
      });
    }
  }, [isLoaded, map]);

  // Handle form input changes
  const [storeName, setStoreName] = useState(store.storeName);
  const [storeAddress, setStoreAddress] = useState(store.storeAddress);
  const [storeTel, setStoreTel] = useState(store.storeTel);
  const [storeOpen, setStoreOpen] = useState(store.storeOpen);
  const [storeClose, setStoreClose] = useState(store.storeClose);
  const [storeDetail, setStoreDetail] = useState(store.storeDetail);

  // Handle form submission
  const handleSubmit = async (event) => {
    const isVet = event.target.isVet.value;
    event.preventDefault();

    const formData = new FormData();
    formData.append("update_by", dataUser.id);
    formData.append("storeLat", newLat);
    formData.append("storeLon", newLng);
    formData.append("storeName", storeName);
    formData.append("storeAddress", storeAddress);
    formData.append("storeTel", storeTel);
    formData.append("storeOpen", storeOpen);
    formData.append("storeClose", storeClose);
    formData.append("storeDetail", storeDetail);
    formData.append("isVet", isVet);
    formData.append("file", fileFormData);
    // console.log(formData);
    try {
      const result = await StoreService.Update(id, formData);
      if (result.status) {
        window.location.href = `/manage`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle map search
  const handleMapSearch = () => {
    if (searchBox && searchBox.getPlaces().length > 0) {
      const place = searchBox.getPlaces()[0];
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      // setFormData({ ...formData, storeLat: lat, storeLon: lng });
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Store</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <StyleDropzone>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>คลิกที่นี่เพื่อเลือกรูปภาพ หรือลางภาพวางลงตรงนี้</p>
              </div>
            </StyleDropzone>
            {hasNewImages ? (
              selected_images
            ) : (
              <div className="container">
                <div className="row justify-content-center text-center">
                  <div className="col-md-6">
                    <Image
                      rounded
                      thumbnail
                      src={`./${store.storeImg}`}
                      alt={store.storeName}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="storeName"
              defaultValue={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="storeAddress"
              defaultValue={storeAddress}
              onChange={(e) => {
                setStoreAddress(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Tel</Form.Label>
                <Form.Control
                  type="text"
                  name="storeTel"
                  defaultValue={storeTel}
                  onChange={(e) => {
                    setStoreTel(e.target.value);
                  }}
                />
              </Col>
              <Col lg={2}>
                <Form.Label>Open</Form.Label>
                <Form.Control
                  type="text"
                  name="storeOpen"
                  defaultValue={storeOpen}
                  onChange={(e) => {
                    setStoreOpen(e.target.value);
                  }}
                />
              </Col>
              <Col lg={2}>
                <Form.Label>Close</Form.Label>
                <Form.Control
                  type="text"
                  name="storeClose"
                  defaultValue={storeClose}
                  onChange={(e) => {
                    setStoreClose(e.target.value);
                  }}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="storeDetail"
              defaultValue={storeDetail}
              onChange={(e) => {
                setStoreDetail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  name="storeLat"
                  value={newLat}
                  onChange={(e) => {
                    setNewLat(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  name="storeLon"
                  value={newLng}
                  onChange={(e) => {
                    setNewLng(e.target.value);
                  }}
                />
              </Col>
              <Col
                lg={3}
                className="d-flex justify-content-center align-items-end"
              >
                <Button variant="info" onClick={handleShowMap}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form.Group>

          {showMap && (
            <div style={{ height: "200px", width: "100%" }}>
              <GoogleMap
                mapContainerStyle={{ height: "100%", width: "100%" }}
                center={{
                  lat: 13.746556236294557,
                  lng: 100.48752786776292,
                }}
                zoom={16}
                onLoad={onMapLoad}
                onClick={onMapClick}
              >
                {marker && (
                  <Marker position={{ lat: marker.lat, lng: marker.lng }} />
                )}
              </GoogleMap>
            </div>
          )}

          {showMap && (
            <Col className="d-flex justify-content-center align-items-end">
              <Button variant="secondary" onClick={handleCloseMap}>
                Close
              </Button>
            </Col>
          )}
          <Form.Group>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Label>คลินิกนี้ได้ใช้โปรแกรม Vet Manage</Form.Label>{" "}
                <Form.Check
                  inline
                  label="ใช่"
                  name="isVet"
                  value={"0"}
                  type={type}
                  id={`inline-${type}-1`}
                  defaultChecked={store.isVet === 0}
                />
                <Form.Check
                  inline
                  label="ไม่ใช่"
                  name="isVet"
                  value={"1"}
                  type={type}
                  id={`inline-${type}-2`}
                  defaultChecked={store.isVet === 1}
                />
              </div>
            ))}
          </Form.Group>

          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
