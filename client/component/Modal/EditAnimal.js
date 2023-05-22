import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { Col, Row, Image } from "react-bootstrap";
import styled from "styled-components";
import TypeService from "@/service/TypeService";
import SelectComponent from "@/function/SearchBarDropdown";
import { setData, setLoading, setError } from "../../store/slices/typesSlice";
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
const EditAnimal = ({ id, onClose, show }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.animals);
  const { data: dataUser } = useSelector((state) => state.users);
  const animal = data.find((animals) => animals.animal_id === id);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileFormData, setFileFormData] = useState([]);

  const [options, setOptions] = useState([]);

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

  const [selectedOption, setSelectedOption] = useState(animal.type_id);
  //   console.log(selectedOption);
  // Handle form input changes
  const [Hn, setHn] = useState(animal.Hn);
  const [animal_name, setAnimal_name] = useState(animal.animal_name);
  const [animal_sex, setAnimal_sex] = useState(animal.animal_sex);
  const [remark, setRemark] = useState(animal.remark);
  console.log(animal_sex);
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(animal_sex);
    const formData = new FormData();
    formData.append("update_by", dataUser.id);
    formData.append("Hn", Hn);
    formData.append("name", animal_name);
    formData.append("remark", remark);
    formData.append(
      "type_id",
      selectedOption ? selectedOption : animal.type_id
    );
    formData.append("sex", animal_sex);
    formData.append("file", fileFormData);
    try {
      const result = await AnimalService.Update(id, formData);
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
        <Modal.Title>Edit Animal</Modal.Title>
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
                      src={`./${animal.image}`}
                      alt={animal.image}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="2">
              เลข HN :
            </Form.Label>
            <Col md="4">
              <Form.Control
                type="text"
                name="Hn"
                defaultValue={Hn}
                onChange={(e) => {
                  setHn(e.target.value);
                }}
              />
            </Col>
            <Form.Label column md="2">
              ชื่อสัตว์เลี้ยง
            </Form.Label>
            <Col md="4">
              <Form.Control
                type="text"
                name="name"
                defaultValue={animal_name}
                onChange={(e) => {
                  setAnimal_name(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
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
                defaultChecked={animal_sex === "ผู้"}
                onChange={(e) => {
                  setAnimal_sex(e.target.value);
                }}
              />
            </Col>
            <Col md={2}>
              <Form.Check
                inline
                label="Female"
                type="radio"
                value="เมีย"
                name="sex"
                defaultChecked={animal_sex === "เมีย"}
                onChange={(e) => {
                  setAnimal_sex(e.target.value);
                }}
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
                  defaultValue={animal.type_id} // Set the default value here
                />
              </div>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>remark</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="remark"
              defaultValue={remark}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            />
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

export default EditAnimal;
