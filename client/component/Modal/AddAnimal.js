import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Col, Row, Image } from "react-bootstrap";
import styled from "styled-components";
import TypeService from "@/service/TypeService";
import { setData, setLoading, setError } from "../../store/slices/typesSlice";
import SelectComponent from "@/function/SearchBarDropdown";
import AnimalService from "@/service/AnimalService";

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

// const options = [
//     { key: 1, value: "Test 1" },
//     { key: 2, value: "Test 2" },
//     { key: 3, value: "Test 3" },
//     { key: 4, value: "Test 4" }
//   ];
const AddAnimal = ({ id, onClose, show }) => {
  const {
    data: dataUser,
    isLoading,
    error,
  } = useSelector((state) => state.users);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const response = await TypeService.Search();
        if (response) {
          // const data = response.data.map((item) => item.id);
          const data = response.data.map((item) => ({
            key: item.id, // Extract the id property
            value: item.name,
            // Add other properties as needed
          }));
          setOptions(data);
          dispatch(setData(response.data));
        } else {
          dispatch(setError("An error occurred while fetching the data."));
        }
      } catch (error) {
        dispatch(setError("An error occurred while fetching the data."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, []);

  // Find the store with the matching id
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

  // Handle form submission
  const handleSubmit = async (event) => {
    // console.log(typeAnimalId);
    event.preventDefault();
    const Hn = event.target.Hn.value;
    const sex = event.target.sex.value;
    const remark = event.target.remark.value;
    const animalName = event.target.name.value;

    const formData = new FormData();
    formData.append("create_by", dataUser.id);
    formData.append("user_id", dataUser.id);
    formData.append("Hn", Hn);
    formData.append("sex", sex);
    formData.append("type_id", selectedOption);
    formData.append("remark", remark);
    formData.append("name", animalName);
    formData.append("file", fileFormData);
    // console.log(formData);
    try {
      const result = await AnimalService.Create(formData);
      if (result.status) {
        window.location.href = `/manage`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="2">
              เลข HN :
            </Form.Label>
            <Col md="4">
              <Form.Control
                type="text"
                name="Hn"
                // value={newLng}
                // onChange={handleInputChange}
              />
            </Col>
            <Form.Label column md="2">
              ชื่อสัตว์เลี้ยง
            </Form.Label>
            <Col md="4">
              <Form.Control
                type="text"
                name="name"
                // value={newLng}
                // onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col md={2}>
              <Form.Label>Gender :</Form.Label>
            </Col>
            <Col md={2}>
              <Form.Check
                inline
                label="Male"
                type="radio"
                value="ผู้"
                name="sex"
                click={true}
              />
            </Col>
            <Col md={2}>
              <Form.Check
                inline
                label="Female"
                type="radio"
                value="เมีย"
                name="sex"
              />
            </Col>
            <Form.Label column md="2">
              ชนิดสัตว์
            </Form.Label>
            <Col md={4}>
              <div className="App">
                <SelectComponent
                  options={options}
                  onChange={(item) => setSelectedOption(item)}
                  selectedKey={selectedOption}
                  placeholder={"type to search"}
                />
                {/* <p>selected option: {selectedOption}</p> */}
              </div>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label column md="2">
              รูปภาพสัตว์เลี้ยง
            </Form.Label>
            <StyleDropzone>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>คลิกที่นี่เพื่อเลือกรูปภาพ หรือลางภาพวางลงตรงนี้</p>
              </div>
            </StyleDropzone>
            {selected_images}
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column md="2">
              หมายเหตุ
            </Form.Label>
            <Col>
              <Form.Control as="textarea" rows={1} name="remark" />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAnimal;
