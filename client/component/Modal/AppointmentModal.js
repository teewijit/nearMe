import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import SelectComponent from "@/function/SearchBarDropdown";
import AnimalService from "@/service/AnimalService";
import { setData, setLoading, setError } from "../../store/slices/animalsSlice";
import AppointmentService from "@/service/AppointmentService";

const AppointmentModal = ({ id, onClose, show }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const { data: dataUser } = useSelector((state) => state.users);

  console.log(dataUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const response = await AnimalService.Search();
        if (response) {
          const mapData = response.data.filter((data) => data.user_id == dataUser.id)
          const data = mapData.map((item) => ({
            key: item.id, // Extract the id property
            value: item.animal_name,
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

  const onInputChange = (event) => {
    setOptions(
      defaultOptions.filter((option) => option.includes(event.target.value))
    );
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const animalId = selectedOption;
    const date = event.target.date.value;
    const time = event.target.time.value;
    const tel = event.target.tel.value;

    const formData = {
      "store_id": id,
       "create_by": dataUser.id ,
       "user_id": dataUser.id ,
       "animal_id": animalId ,
       "time": time ,
       "date": date ,
       "tel": tel 
  };
    
    try {
      const result = await AppointmentService.Create(formData);
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
        <Modal.Title>Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          ></Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="3">
              สัตว์ที่เข้ารับการรักษา
            </Form.Label>
            <Col sm="9">
              <div className="App">
                <SelectComponent
                  options={options}
                  onChange={(item) => setSelectedOption(item)}
                  selectedKey={selectedOption}
                  placeholder={"Animal to search"}
                />
              </div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              วันนัดหมาย
            </Form.Label>
            <Col sm="5">
              <Form.Control type="date" name="date" />
            </Col>
            <Form.Label column sm="1">
              เวลา
            </Form.Label>
            <Col sm="4">
              <Form.Control type="time" name="time" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              เบอร์ติดต่อ
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" maxLength={10} name="tel" />
            </Col>
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

export default AppointmentModal;
