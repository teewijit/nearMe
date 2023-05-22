import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import StoreService from "@/service/StoreService";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setData, setLoading, setError } from "../store/slices/storesSlice";
import Table from 'react-bootstrap/Table';

const Datatable = () => {
  const { data, isLoading, error } = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        dispatch(setLoading(true));

        const response = await StoreService.Search();
        console.log(response);

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
  }, [router.pathname]);

  const columns = [
    {
      name: "ชื่อ",
      selector: (data) => data.storeName,
    },
    {
      name: "ที่อยู่",
      selector: (data) => data.storeAddress,
    },
    {
      name: "รายละเอียด",
      selector: (data) => data.storeDetail,
    },
    {
      name: "เวลาเปิด",
      selector: (data) => data.storeOpen,
    },
    {
      name: "เวลาปิด",
      selector: (data) => data.storeClose,
    },
    {
      name: "Lat",
      selector: (data) => data.storeLat,
    },
    {
      name: "Lon",
      selector: (data) => data.storeLon,
    },
    {
      name: "create_date",
      selector: (data) => data.create_date,
    },
    {
      name: "create_by",
      selector: (data) => data.create_by,
    },
    {
      name: "Image",
      selector: (data) => {
        let newPath = "./";
        let Image = newPath + data.storeImg;
        return (
          <img
            src={Image}
            width={50}
            height={50}
            alt="Store Image"
            onClick={() => {
              setSelectedImage(Image);
              setModalIsOpen(true);
            }}
          />
        );
      },
    },
  ];
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Table responsive className="mt-5">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.name} scope="col">
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col.name}>{col.selector(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              content: {
                width: "90%",
                height: "auto",
                margin: "auto",
              },
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setModalIsOpen(false)}
              ></button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "90%",
              }}
            >
              <img
                src={selectedImage}
                alt="Store Image"
                style={{ width: "100%", height: "90%" }}
              />
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Datatable;
