import React, { useState, useEffect } from "react";
import StoreService from "@/service/StoreService";
import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading, setError } from "../store/slices/storesSlice";
import Search from "./Search";
import Pagination from "./Pagination";
import getLocation from "@/function/getLocation";
import calculateDistance from "@/function/calculateDistance";
import Loader from "./LoaderBackup";
import styled from "styled-components";

const TextAlertDanger = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid red;
  margin: 20px 0;
`;

const Cards = () => {
  const { loaded, coordinates, errorLocation } = getLocation();
  const { data, isLoading, error } = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);

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

  const distances = data.map((store) => {
    const lat2 = store.storeLat;
    const lon2 = store.storeLon;
    return calculateDistance(coordinates.lat, coordinates.lng, lat2, lon2);
  });

  // sort data by distance
  const sortedData = data
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
        <div className="row">
          <div className="col-md-12">
            <Search onSearch={handleSearch} />
          </div>
        </div>
        <div className="row">
          {filteredData.length === 0 ? (
            <TextAlertDanger>No results found.</TextAlertDanger>
          ) : (
            currentData.map((store, index) => {
              let newPath = "./";
              let Image = newPath + store.storeImg;
              return (
                <div key={store.id} className="card mt-3 p-5">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="card-title">{store.storeName}</h5>
                    <h5 className="card-title">{store.distance} km</h5>
                  </div>
                  <img
                    src={Image}
                    className="img-fluid rounded"
                    alt={store.storeName}
                  />
                  <div className="card-body">
                    <p className="card-text">{store.storeAddress}</p>
                    <p className="card-text">{store.storeDetail}</p>
                    <p className="card-text">{store.storeLat}</p>
                    <p className="card-text">{store.storeLon}</p>
                    <p className="card-text">{store.storeTel}</p>
                    <div className="d-flex justify-content-end mb-3">
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${store.storeLat},${store.storeLon}`
                          )
                        }
                      >
                        Review
                      </button>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${store.storeLat},${store.storeLon}`
                          )
                        }
                      >
                        Open in Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <Pagination
            dataPerPage={dataPerPage}
            totalData={filteredData.length}
            paginate={paginate}
            currentData={currentData}
          />
        </div>
      </div>
    </>
  );
};

export default Cards;
