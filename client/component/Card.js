import React, { useState, useEffect } from "react";
import StoreService from "@/service/StoreService";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Form } from "react-bootstrap";
import { setData, setLoading, setError } from "../store/slices/storesSlice";
import getLocation from "@/function/getLocation";
import calculateDistance from "@/function/calculateDistance";
import Search from "./Search";
import Pagination from "./Pagination";
import "bootstrap-icons/font/bootstrap-icons.css";
import MapAll from "./MapAll";
import styled, { keyframes } from "styled-components";
import AppointmentModal from "./Modal/AppointmentModal";

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
  }
`;

const Card = styled.div`
  border: 1px solid #000;
  border-radius: 8px;
  padding: 0;
  margin: 3rem;
`;

const CardImage = styled.div`
  img {
    max-height: 100%;
    max-width: 100%;
    border-radius: 8px 8px 0 0;
  }
`;

const CardAction = styled.div`
  position: relative;
  float: right;
  margin-top: -35px;
  margin-right: -38px;
  z-index: 2;
  // color: #e26d5c;
  // background: #fff;
  border-radius: 100%;
  // padding-left: 15px;
  // padding-right: 15px;
  // padding-top: 5px;
  font-size: 35px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    // color: #fff;
    // background: #e26d5c;
    animation: ${pulseAnimation} 1.5s infinite;
  }
`;

const CardHeading = styled.div`
  font-size: 18px;
  font-weight: bold;
  background: #fff;
  padding: 10px 15px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 15px;
`;

const CardText = styled.div`
  padding: 10px 15px;
  background: #fff;
  font-size: 14px;
  color: #636262;
`;

const CardButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  background-color: #1f487e;
  color: #fff;
  border-radius: 0 0 8px 8px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    background-color: #1d3461;
    color: #fff;
  }
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #d10000;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  p {
    font-size: 12px;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export default function Cards() {
  const { loaded, coordinates, errorLocation } = getLocation();
  const { data, isLoading, error } = useSelector((state) => state.stores);
  // Find the stores with the matching create_by value and search term
  const matchingStores = data.filter((store) => store.status === "approve");

  const [showAppModal, setShowAppModal] = useState(false);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);
  const [showMap, setShowMap] = useState(false);
  const [appId, setAppId] = useState(null);

  const handleToggleMap = () => {
    setShowMap((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        dispatch(setLoading(true));

        const response = await StoreService.Search();

        if (response) {
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

    fetchStoreData();
  }, []);

  const handleAppointment = (id) => {
    setAppId(id);
    setShowAppModal(true);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // reset page number to 1
  };

  if (errorLocation) {
    return <div>Error: {errorLocation.message}</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!loaded || isLoading) {
    return <div>Please grant access to current location...</div>;
  }

  const distances = matchingStores.map((store) => {
    const lat2 = store.storeLat;
    const lon2 = store.storeLon;
    return calculateDistance(coordinates.lat, coordinates.lng, lat2, lon2);
  });

  const coordinate = matchingStores.map((store, index) => {
    return {
      lat: store.storeLat,
      lng: store.storeLon,
      storeName: store.storeName,
      storeAddress: store.storeAddress,
      storeDetail: store.storeDetail,
      tel: store.storeTel,
      open: store.storeOpen,
      close: store.storeClose,
      storeImg: store.storeImg,
      isvet: store.isVet,
    };
  });
  // sort data by distance
  const sortedData = matchingStores
    .map((store, index) => ({
      ...store,
      distance: distances[index],
    }))
    .sort((a, b) => a.distance - b.distance);

  const filteredData = sortedData.filter((store) => {
    return store.storeName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8 col-md-9 col-lg-10">
            <Search onSearch={handleSearch} />
          </div>
          <div className="col-2 col-sm-4 col-md-3 col-lg-2">
            <Button onClick={handleToggleMap}>
              {showMap ? "close" : "Search With Map"}
            </Button>
          </div>
          {showMap && <MapAll coordinates={coordinate} />}
        </div>
        <div className="row justify-content-center">
          {filteredData.length === 0 ? (
            <div className="text-center mt-3">
              <Alert variant="danger">
                <Alert.Heading>No results found.</Alert.Heading>
              </Alert>
            </div>
          ) : (
            currentData.map((store, index) => {
              let newPath = "./";
              let Image = newPath + store.storeImg;
              return (
                <>
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-8 col-12">
                      <Card className="card-sl">
                        {store.isVet === 0 ? (
                          <CardAction className="card-action">
                            <Tooltip>
                              <img
                                src="./manage.png"
                                style={{ width: "80px", height: "80px" }}
                                onClick={() => handleAppointment(store.id)}
                              ></img>
                              <p className="tooltiptext">Use Vet Manage</p>
                            </Tooltip>
                          </CardAction>
                        ) : (
                          <></>
                        )}
                        <CardTop>{store.distance}</CardTop>
                        <CardImage className="card-image text-center p-3">
                          <img src={Image} />
                        </CardImage>
                        <CardHeading className="card-heading">
                          {store.storeName}
                        </CardHeading>
                        <CardText className="card-text">
                          {store.storeTel}
                        </CardText>
                        <CardButton
                          className="card-button"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${store.storeLat},${store.storeLon}`
                            )
                          }
                        >
                          {" "}
                          Open in Google Maps
                        </CardButton>
                      </Card>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
        <Pagination
          dataPerPage={dataPerPage}
          totalData={filteredData.length}
          paginate={paginate}
          currentData={currentData}
        />
      </div>
      {appId && (
        <AppointmentModal
          id={appId}
          onClose={() => setShowAppModal(null)}
          show={showAppModal}
        />
      )}
    </>
  );
}
