import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import UserService from "@/service/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setData, setError, setLoading } from "@/store/slices/usersSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import StoreService from "@/service/StoreService";
import { Col, Row, Form, Button } from "react-bootstrap";
import Loader from "@/component/LoaderBackup";

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

const FormAddStore = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);
  const router = useRouter();
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
          <Button variant="danger" onClick={() => removeImage(index)}>
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

  useEffect(() => {
    async function fetchProfile() {
      try {
        dispatch(setLoading(true));
        const getProfile = await UserService.getProfile();
        if (getProfile) {
          dispatch(setData(getProfile.data));
        } else {
          dispatch(setError("An error occurred while fetching the data."));
        }
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProfile();
  }, [router.pathname]);
  const [isVet, setIsVet] = useState("");
  const [status, setStatus] = useState("approve");

  const handleSubmit = async (event) => {
    if (data.role_id === 3) {
      setStatus("notApprove");
    }
    event.preventDefault();
    const storeLat = event.target.storeLat.value;
    const storeLon = event.target.storeLon.value;
    const storeName = event.target.storeName.value;
    const storeAddress = event.target.storeAddress.value;
    const storeTel = event.target.storeTel.value;
    const storeOpen = event.target.storeOpen.value;
    const storeClose = event.target.storeClose.value;
    const storeDetail = event.target.storeDetail.value;
    const create_by = event.target.create_by.value;
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
    formData.append("status", "notApprove");
    formData.append("isVet", isVet);
    formData.append("file", fileFormData);
    console.log(fileFormData);
    // Call the Upload function in StoreService
    let result = await StoreService.Create(formData);
    if (result.status) {
      window.location.href = `/manage`;
    }
  };

  const handleIsVet = (event) => {
    setIsVet(event.target.value);
  };

  const queryString =
    typeof window !== "undefined" ? window.location.search : "";
  // console.log(queryString);

  const urlParams = new URLSearchParams(queryString);

  const [lat, setLat] = useState(urlParams.get("lat") || "");
  const [lon, setLon] = useState(urlParams.get("lng") || "");

  const onChangeLat = (e) => {
    setLat(e.target.value);
  };
  const onChangeLon = (e) => {
    setLon(e.target.value);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <>
          <h1 className="text-center p-4">เพิ่มคลินิก</h1>
          <div className="row">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="storeLat"
                      name="storeLat"
                      onChange={onChangeLat}
                      value={lat}
                    />
                    <Form.Control
                      type="hidden"
                      className="form-control"
                      id="create_by"
                      name="create_by"
                      value={data.id}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="storeLon"
                      name="storeLon"
                      onChange={onChangeLon}
                      value={lon}
                    />
                  </Col>
                  <Col
                    lg={1}
                    className="d-flex justify-content-center align-items-end"
                  >
                    <Link href="/maps" className="text-primary">
                      {" "}
                      <Button variant="info">Search</Button>
                    </Link>
                  </Col>
                </Row>
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
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="storeName" />
              </Form.Group>

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

              <Form.Group>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Label>คลินิกนี้ได้ใช้โปรแกรม Vet Manage</Form.Label>{" "}
                    <Form.Check
                      onChange={handleIsVet}
                      required
                      inline
                      name="isVet"
                      label="ใช่"
                      value={"0"}
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      onChange={handleIsVet}
                      required
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
              <Button variant="primary" type="submit">
                บันทึก
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <div>No data found</div>
      )}
    </>
  );
};

export default FormAddStore;
