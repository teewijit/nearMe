import React, { useRef, useState, useEffect, useCallback } from "react";
import { Col, Row, Form, Button, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import StoreService from "@/service/StoreService";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import styled from "styled-components";

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

const AddClinicModal = ({ onClose, show }) => {
  const { data, isLoading, error } = useSelector((state) => state.users);
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

  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  const mapRef = useRef();
  const [showMap, setShowMap] = useState(false);
  const [marker, setMarker] = useState(null);
  const [newLat, setNewLat] = useState("");
  const [newLng, setNewLng] = useState("");
  // Function to handle the "Show Map" button click event
  const handleShowMap = () => {
    setShowMap(true);
  };
  const handleCloseMap = () => {
    setShowMap(false);
  };

  const onMapClick = (event) => {
    console.log(newLat);
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setNewLat(event.latLng.lat());
    setNewLng(event.latLng.lng());
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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const storeLat = event.target.storeLat.value;
    const storeLon = event.target.storeLon.value;
    const storeName = event.target.storeName.value;
    const storeAddress = event.target.storeAddress.value;
    const storeTel = event.target.storeTel.value;
    const storeOpen = event.target.storeOpen.value;
    const storeClose = event.target.storeClose.value;
    const storeDetail = event.target.storeDetail.value;
    const create_by = data.id;
    const isVet = event.target.isVet.value;

    // Create a FormData object
    const formData = new FormData();
    formData.append("create_by", create_by);
    formData.append("storeLat", storeLat);
    formData.append("storeLon", storeLon);
    formData.append("storeName", storeName);
    formData.append("storeAddress", storeAddress);
    formData.append("storeTel", storeTel);
    formData.append("storeOpen", storeOpen);
    formData.append("storeClose", storeClose);
    formData.append("storeDetail", storeDetail);
    formData.append("isVet", isVet);
    formData.append("file", fileFormData);
    console.log(storeDetail);
    // Call the Upload function in StoreService
    let result = await StoreService.Create(formData);
    swal(result.message, {
      icon: result.status ? "success" : "error",
      timer: 1000,
    });
    if (result.status) {
      window.location.href = `/manage/`;
    } else {
      swal({
        title: "Error",
        text: result.message,
        icon: "error",
      });
    }
  };
  const [newOpen, setNewOpen] = useState("");
  // Handle form input changes
  const handleInputChange = (event) => {
    // setNewOpen(event.target.storeOpen.value)
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle map search
  const handleMapSearch = () => {
    if (searchBox && searchBox.getPlaces().length > 0) {
      const place = searchBox.getPlaces()[0];
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setFormData({ ...formData, storeLat: lat, storeLon: lng });
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มคลินิก</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="text"
                  name="storeLat"
                  value={newLat}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="text"
                  name="storeLon"
                  value={newLng}
                  onChange={handleInputChange}
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

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="storeName" />

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows={3} name="storeAddress" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>Tel</Form.Label>
                    <Form.Control type="text" name="storeTel" maxLength={10} />
                  </Col>
                  <Col lg={2}>
                    <Form.Label>Open</Form.Label>
                    <Form.Control type="text" name="storeOpen" />
                  </Col>
                  <Col lg={2}>
                    <Form.Label>Close</Form.Label>
                    <Form.Control type="text" name="storeClose" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Detail</Form.Label>
                <Form.Control as="textarea" rows={3} name="storeDetail" />
              </Form.Group>
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3">
            <StyleDropzone>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>คลิกที่นี่เพื่อเลือกรูปภาพ หรือลางภาพวางลงตรงนี้</p>
              </div>
            </StyleDropzone>
            {selected_images}
          </Form.Group>
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
                />
                <Form.Check
                  inline
                  label="ไม่ใช่"
                  name="isVet"
                  value={"1"}
                  type={type}
                  id={`inline-${type}-2`}
                />
              </div>
            ))}
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              บันทึก
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddClinicModal;
