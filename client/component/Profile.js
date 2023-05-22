import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  Col,
  Row,
  Form,
  Button,
  Modal,
  Table,
  Image,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import UserService from "@/service/UserService";
import Swal from "sweetalert2";
import AddAnimal from "./Modal/AddAnimal";
import EditAnimal from "./Modal/EditAnimal";
import AnimalService from "@/service/AnimalService";

// const ProfileContainer = styled.div`
//   .profile {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin: 20px;
//     padding: 20px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
//     width: 300px;
//   }

//   .profile-header {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-bottom: 20px;
//   }

//   .profile-header img {
//     width: 100px;
//     height: 100px;
//     border-radius: 50%;
//     margin-bottom: 10px;
//   }

//   .profile-header h2 {
//     font-size: 1.5rem;
//     margin: 0;
//   }

//   .profile-body {
//     display: flex;
//     flex-direction: column;
//   }

//   .profile-body p {
//     margin: 5px 0;
//   }
// `;

const Profile = () => {
  const { data: dataUser } = useSelector((state) => state.users);
  const { data: dataAnimal } = useSelector((state) => state.animals);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheckPass, setIsCheckPass] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState(dataUser.username);
  const [password, setPassword] = useState(dataUser.password);
  const [first_name, setFirst_name] = useState(dataUser.first_name);
  const [last_name, setLast_name] = useState(dataUser.last_name);
  const [sex, setSex] = useState(dataUser.sex);
  const [brithday, setBrithday] = useState(dataUser.brithday);
  const [tel, setTel] = useState(dataUser.tel);
  const [email, setEmail] = useState(dataUser.email);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mapData = dataAnimal.filter((data) => data.user_id === dataUser.id);

  const handleClickCancel = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  };
  const handleClick = () => {
    if (isEditMode) {
      setIsEditMode(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            username,
            first_name,
            last_name,
            brithday,
            sex,
            tel,
            email,
            update_by: dataUser.id,
          };

          try {
            const result = await UserService.Update(dataUser.id, data);

            if (result.status) {
              setIsSuccess(true); // enable the success state
              setIsEditMode(false); // exit the edit mode
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    } else {
      setIsEditMode(true);
    }
  };


  const [editId, setEditId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (id) => {
    setEditId(id);
    setShowEditModal(true);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
    setIsSuccess(true);
  };

  const [editUserId, setEditUserId] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleEditUserClick = (id) => {
    setEditUserId(id);
    setShowEditUserModal(true);
  };
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isCheckPass) {
      Swal.fire({
        icon: "error",
        title: "Please check password",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }

    try {
      const data = {
        password: newPassword,
      };

      // Call the UserService Update function to update the password
      const result = await UserService.Update(dataUser.id, data);

      console.log(result);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Password updated successfully",
        });
        const timeout = 2000; // Timeout duration in milliseconds (e.g., 2000 ms = 2 seconds)

        setTimeout(() => {
          window.location.href = "/manage"; // Redirect to the login page
        }, timeout);

        // Perform any additional actions after successful password update
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update password",
          text: result.message, // You can display an error message from the result object
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Failed to update password. Please try again.",
      });
    }
  };

  const checkPass = async (event) => {
    // console.log(currentPassword);
    try {
      const data = {
        password: currentPassword,
      };
      const result = await UserService.CheckPass(dataUser.id, data);
      console.log(result);
      if (result.status) {
        setIsCheckPass(true);
      } else if (!result.status) {
        setIsCheckPass(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "An error occurred",
        text: "Failed to update password. Please try again.",
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [showAddAnimalModal, setShowAddAnimalModal] = useState(false);
  const handleAnimal = (event) => {
    setShowAddAnimalModal(true);
  };

  const [showModalImage, setShowModalImage] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImgClick = (imgSrc) => {
    setSelectedImg(imgSrc);
    setShowModalImage(true);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await AnimalService.Delete(id);
          console.log(response);
          if (response.status) {
            Swal.fire({
              title: "Deleted",
              text: "Your file has been deleted",
              icon: "success",
              timer: 1000,
            });
            window.location.href = `/manage/`;
          } else {
            Swal.fire({
              title: "Error",
              text: response.message,
              icon: "error",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
     {/* <ProfileContainer> */}
      <Row className="justify-content-center mt-5">
        <Col xs={12} xl={8} xxl={6} lg={10}>
          <Col className="mb-5">
            <Button onClick={handleAnimal}>เพิ่มสัตว์เลี้ยง</Button>
          </Col>

          {showAddAnimalModal && (
            <AddAnimal
              id={dataUser.id}
              onClose={() => setShowAddAnimalModal(false)}
              show={showAddAnimalModal}
            />
          )}
          <Card className="p-3">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Row>
                  <Col xs={12} sm={7} xl={8} xxl={9} lg={8}>
                    <Form.Control
                      type="text"
                      name="username"
                      defaultValue={dataUser.username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setIsSuccess(false);
                      }}
                      disabled={!isEditMode}
                    />
                  </Col>
                  <Col xs={12} sm={5} xl={4} xxl={3} lg={4}>
                    <Button
                      variant="danger"
                      size="md"
                      disabled={!isEditMode}
                      onClick={handleShow}
                    >
                      reset passsword
                    </Button>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col xs={12} sm={6} lg={6}>
                    <Form.Label htmlFor="firstName">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      defaultValue={dataUser.first_name}
                      onChange={(e) => {
                        setFirst_name(e.target.value);
                        setIsSuccess(true);
                      }}
                      disabled={!isEditMode}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={6}>
                    <Form.Label htmlFor="lastName">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      defaultValue={dataUser.last_name}
                      onChange={(e) => {
                        setLast_name(e.target.value);
                        setIsSuccess(true);
                      }}
                      disabled={!isEditMode}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col xs={12} sm={12} lg={4}>
                    <Form.Label>Sex</Form.Label>{" "}
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Male"
                          name="sex"
                          value={"Male"}
                          type={type}
                          id={`inline-${type}-1`}
                          defaultChecked={dataUser.sex === "Male"}
                          onChange={handleSexChange}
                          disabled={!isEditMode}
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
                          disabled={!isEditMode}
                        />
                      </div>
                    ))}
                  </Col>
                  <Col xs={12} sm={6} lg={4}>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthday"
                      required
                      defaultValue={dataUser.brithday}
                      onChange={(e) => {
                        setBrithday(e.target.value);
                        setIsSuccess(true);
                      }}
                      disabled={!isEditMode}
                    />
                  </Col>
                  <Col xs={12} sm={6} lg={4}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="user_tel"
                      maxLength="10"
                      required
                      disabled={!isEditMode}
                      onChange={(e) => {
                        setTel(e.target.value);
                        setIsSuccess(true);
                      }}
                      defaultValue={dataUser.tel}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="user_email"
                  required
                  defaultValue={dataUser.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsSuccess(true);
                  }}
                  disabled={!isEditMode}
                />
              </Form.Group>

              <Form.Group className="text-center">
                <Button
                  type="button"
                  variant={isEditMode ? "success" : "primary"}
                  onClick={handleClick}
                  disabled={isEditMode ? isSubmitting : isSuccess}
                >
                  {isEditMode ? "Update" : "Edit"}
                </Button>{" "}
                {!isEditMode && isSuccess && (
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setIsEditMode(true)}
                  >
                    Edit Again
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={handleClickCancel}
                  disabled={!isEditMode}
                  className="m-3"
                >
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
      <div>
        <h1>สัตว์เลี้ยงของคุณ</h1>
      </div>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อเจ้าของ</th>
            <th>นามสกุล</th>
            <th>Hn</th>
            <th>ชื่อสัตว์เลี้ยง</th>
            <th>ชนิด</th>
            <th>เพศ</th>
            <th>remrak</th>
            <th>By</th>
            <th>create_date</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        {mapData &&
          mapData.map((animal, index) => (
            <tbody className="text-center">
              <tr key={animal}>
                <td>{index + 1}</td>
                <td>{animal.first_name}</td>
                <td>{animal.last_name}</td>
                <td>{animal.Hn}</td>
                <td>{animal.animal_name}</td>
                <td>{animal.type_name}</td>
                <td>{animal.animal_sex}</td>
                <td>{animal.remark}</td>
                <td>{animal.create_by}</td>
                <td>{animal.create_date}</td>
                <td>
                  <Image
                    rounded
                    thumbnail
                    src={`./${animal.image}`}
                    alt={animal.animal_name}
                    onClick={() => handleImgClick(`./${animal.image}`)}
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </td>
                <td>
                  <a href="#" onClick={() => handleEditClick(animal.id)}>
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href="#" onClick={() => handleDeleteClick(animal.id)}>
                    <i className="bi bi-trash"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          ))}
          {editId && (
            <EditAnimal
              id={editId}
              onClose={() => setEditId(null)}
              show={showEditModal}
            />
          )}
      </Table>
      
      <Modal
        centered
        size="lg"
        show={showModalImage}
        onHide={() => setShowModalImage(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Preview Image</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <Image
            src={selectedImg}
            alt="Full-size preview"
            style={{ maxWidth: "100%" }}
          />
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Passeord</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3 align-items-end">
              <Col sm={9}>
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                      }}
                    />
                    <span className="input-group-text">
                      {showPassword ? (
                        <i
                          className="bi bi-eye-slash"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <i
                          className="bi bi-eye"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </span>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Button
                  variant="info"
                  size="md"
                  onClick={checkPass}
                  className="text-center"
                >
                  check
                </Button>
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <span className="input-group-text">
                  {showNewPassword ? (
                    <i
                      className="bi bi-eye-slash"
                      onClick={toggleNewPasswordVisibility}
                    />
                  ) : (
                    <i
                      className="bi bi-eye"
                      onClick={toggleNewPasswordVisibility}
                    />
                  )}
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <span className="input-group-text">
                  {showConfirmPassword ? (
                    <i
                      className="bi bi-eye-slash"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <i
                      className="bi bi-eye"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </span>
              </div>
            </Form.Group>
            <Modal.Footer>
              <span className="text-danger">
                *** กรุณากดเช็ครหัสผ่านก่อน ***
              </span>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
     {/* </ProfileContainer> */}
    </>
  );
};

export default Profile;
