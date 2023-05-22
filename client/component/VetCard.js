import React, { useEffect, useState } from "react";
import { Card, Col, Row, Image, Alert } from "react-bootstrap";
import AnimalService from "@/service/AnimalService";
import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading, setError } from "../store/slices/animalsSlice";
import Loader from "./Loader";

const VetCard = () => {
  const [dataVetCard, setDataVetCard] = useState([]);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const {
    data: dataUser,
    isLoading,
    error,
  } = useSelector((state) => state.users);

  const mapData = dataVetCard.filter((data) => data.user_id === dataUser.id);

  // console.log(mapData.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const response = await AnimalService.Search();
        if (response) {
          dispatch(setData(response.data));
          setDataVetCard(response.data);
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

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : mapData.length > 0 ? (
        mapData &&
        mapData.map((mapData, index) => (
          <>
            <Row className="justify-content-center mt-5" key={index}>
              <Col sm={12} xl={8} xxl={6} lg={10}>
                <Card className="p-3" border="danger">
                  <div class="">
                    <Card style={{ border: "none" }}>
                      <Card.Body>
                        <div class="d-flex align-items-center w-100">
                          <div class="d-flex flex-column w-100">
                            <div class="fw-bold">
                              บัตรประจำตัวสัตว์ Animal Card
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

                  <Row>
                    <Col sm={12} md={4} lg={4} xl={3}>
                      <Card
                        style={{
                          width: "100%",
                          border: "none",
                          padding: "1rem",
                        }}
                      >
                        <Image
                          src="./noImg.jpg"
                          rounded
                          className="img-fluid"
                          style={{ maxHeight: "20rem" }}
                        />
                      </Card>
                    </Col>
                    <Col sm={12} md={4} lg={4} xl={5}>
                      <Card style={{ width: "100%", border: "none" }}>
                        <Card.Text>
                          <div>
                            <i class="bi bi-credit-card-2-back">
                              <span className="m-2">
                                : {mapData.animal_name}
                              </span>
                            </i>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div>
                            <i class="bi bi-gender-ambiguous">
                              <span className="m-2">
                                : {mapData.animal_sex}
                              </span>
                            </i>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div>
                            <i class="bi bi-tag">
                              <span className="m-2">: {mapData.type_name}</span>
                            </i>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div>
                            <i class="bi bi-person">
                              <span className="m-2">
                                : {mapData.first_name} {mapData.last_name}
                              </span>
                            </i>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div>
                            <i class="bi bi-telephone">
                              <span className="m-2">: {mapData.tel}</span>
                            </i>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div>
                            <i class="bi bi-bookmark-star">
                              <span className="m-2">: {mapData.remark}</span>
                            </i>
                          </div>
                        </Card.Text>
                      </Card>
                    </Col>
                    <Col sm={12} md={4} lg={4} xl={4}>
                      <Card style={{ width: "100%", borderColor:"black"}}>
                        <Image
                          src={`./${mapData.image}`}
                          rounded
                          className="img-fluid"
                          style={{ maxHeight: "20rem" }}
                        />
                      </Card>
                        <Card.Body className="text-center">
                          <Card.Text>HN : {mapData.Hn}</Card.Text>
                        </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </>
        ))
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

export default VetCard;
