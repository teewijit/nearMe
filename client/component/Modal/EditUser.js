import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import UserService from "@/service/UserService";

const EditUser = ({ id, onClose, show }) => {
  const [userPending, setUserPending] = useState([]);
  const dataUser = userPending.find((user) => user.id === id);
  const { data: dataAdmin } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchStoreData = async () => {
      const response = await UserService.getAll();
      setUserPending(response.data);
    };
    fetchStoreData();
  }, []);

  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [sex, setSex] = useState("");
  const [brithday, setBrithday] = useState("");

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const brithday = event.target.birthday.value;
    const sex = event.target.sex.value;

    const data = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      brithday: brithday,
      sex: sex,
      update_by: dataAdmin.id
    };

    try {
      const result = await UserService.Update(id, data);
      if (result.status) {
        window.location.href = `/manage`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {dataUser ? (
        <>
          <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    defaultValue={dataUser.username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    defaultValue={dataUser.first_name}
                    onChange={(e) => {
                      setFirst_name(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    defaultValue={dataUser.last_name}
                    onChange={(e) => {
                      setLast_name(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Label>Sex</Form.Label>{" "}
                      <Form.Check
                        inline
                        label="Male"
                        name="sex"
                        value={"Male"}
                        type={type}
                        id={`inline-${type}-1`}
                        defaultChecked={dataUser.sex === "Male"}
                        onChange={handleSexChange}
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="sex"
                        value={"Female"}
                        type={type}
                        id={`inline-${type}-2`}
                        defaultChecked={dataUser.sex === "Female"}
                        onChange={handleSexChange}
                      />
                    </div>
                  ))}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthday"
                    required
                    defaultValue={dataUser.brithday}
                    onChange={(e) => {
                      setBrithday(e.target.value);
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
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditUser;
