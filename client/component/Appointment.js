import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading, setError } from "../store/slices/appointment";
import Loader from "./Loader";
import AppointmentService from "@/service/AppointmentService";
import Swal from "sweetalert2";

const Appointment = () => {
  const [dataApp, setDataApp] = useState([]);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const {
    data: dataUser,
    isLoading,
    error,
  } = useSelector((state) => state.users);

  const mapData = dataApp.filter((data) => data.user_id === dataUser.id);
  mapData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  // console.log(mapData.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const response = await AppointmentService.Search();
        if (response) {
          dispatch(setData(response.data));
          setDataApp(response.data);
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

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = {
          status: "ยกเลิก",
          update_by: dataUser.id,
        };
        try {
          const response = await AppointmentService.Update(id, formData);
          console.log(response);
          if (response.status) {
            Swal.fire({
              title: "Updated",
              text: "Your has been updated",
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
      {isLoading ? (
        <Loader></Loader>
      ) : mapData.length > 0 ? (
        <>
          {mapData
            .slice()
            .sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
            .map((item, index) => (
              <>
                <Row className="justify-content-center mt-5" bg="danger">
                  <Col xs={12} xl={9} xxl={6} lg={10}>
                    <Card className="p-3" border="danger">
                      <div class="">
                        <Card style={{ border: "none" }}>
                          <Card.Body>
                            <div class="d-flex align-items-center w-100">
                              <div class="d-flex flex-column w-100">
                                <div class="fw-bold">
                                  บัตรนัดหมาย Appointment Card
                                </div>
                                <hr className="m-0" />
                                <div class="text-muted">
                                  โปรแกรมจัดการสถานพยาบาลสัตว์ VetManage
                                </div>
                              </div>
                              <img
                                class="rounded-circle"
                                src="./manage.png"
                                alt="profile picture"
                                width="50"
                                height="50"
                              />
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="">
                        <Card style={{ border: "none" }}>
                          <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={12} md={4}>
                                สัตว์ที่เข้ารับการรักษา
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={item.animal_name}
                                />
                              </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={12} md={2}>
                                วันที่นัดหมาย
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  type="date"
                                  disabled
                                  value={item.date}
                                />
                              </Col>
                              <Form.Label column sm={12} md={2}>
                                เวลา
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  type="time"
                                  disabled
                                  value={item.time}
                                />
                              </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={12} md={2}>
                                เบอร์ติดต่อ
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={item.tel}
                                />
                              </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                              <Form.Label column sm={12} md={2}>
                                สถานะ
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={item.status}
                                />
                              </Col>
                              <Form.Label column sm={12} md={2}>
                                การดำเนินการ
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  type="text"
                                  disabled
                                  value={item.action}
                                />
                              </Col>
                            </Form.Group>
                          </Card.Body>
                        </Card>
                        <div class="d-flex justify-content-center align-items-center w-100">
                          {item.action !== "ดำเนินการเรียบร้อย" && item.status !== "ยกเลิก" && (
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteClick(item.id)}
                            >
                              ยกเลิกการนัดหมาย
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </>
            ))}
        </>
      ) : (
        <Row className="justify-content-center mt-5">
          <Col xs={12} xl={8} xxl={6} lg={10}>
            <Alert
              className="text-center"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              <Alert.Heading>No Data Vet Card</Alert.Heading>
            </Alert>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Appointment;
