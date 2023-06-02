import React, { useState, useEffect } from "react";
import {
  Alert,
  Table,
  Modal,
  Image,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import EditModal from "@/component/Modal/EditModal";
import Swal from "sweetalert2";
import Pagination from "@/component/Pagination";
import AppointmentService from "@/service/AppointmentService";
import EditUser from "@/component/Modal/EditUser";

const Clinic = () => {
  const { data, isLoading, error } = useSelector((state) => state.stores);
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useSelector((state) => state.users);

  const [userAppPending, setAppPending] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      const response = await AppointmentService.Search();
      setAppPending(response.data);
    };
    fetchStoreData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const [editId, setEditId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editUserId, setEditUserId] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);

  if (isLoading || isLoadingUser) {
    return <div>Loading...</div>;
  }

  // Find the stores with the matching create_by value and search term
  const matchingStores = data.filter(
    (store) =>
      store.create_by === dataUser.id &&
      store.storeName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const DataUserAprrove =
    userAppPending &&
    userAppPending.filter(
      (user) => user.status === "รออนุมัติ" && user.action === "ยังไม่ดำเนินการ"
    );

  const DataUserNotAprrove =
    userAppPending &&
    userAppPending.filter(
      (user) => user.status === "อนุมัติ" && user.action === "ยังไม่ดำเนินการ"
    );

  const DataUserAppAll =
    userAppPending &&
    userAppPending.filter(
      (user) => user.status === "ยกเลิก" || user.action === "ดำเนินการเรียบร้อย"
    );

  const matchingStoresApproveAll = DataUserAppAll.filter((store) =>
    matchingStores.some((user) => user.id === store.store_id)
  );

  const matchingStoresApprove = DataUserAprrove.filter((store) =>
    matchingStores.some((user) => user.id === store.store_id)
  );

  const matchingStoresNotApprove = DataUserNotAprrove.filter((store) =>
    matchingStores.some((user) => user.id === store.store_id)
  );

  const filteredDataUserApproveAll = matchingStoresApproveAll.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredDataUserApprove = matchingStoresApprove.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredDataUserNotApprove = matchingStoresNotApprove.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentDataUserAprroveAll = filteredDataUserApproveAll.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const currentDataUserAprrove = filteredDataUserApprove.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const currentDataUserNotAprrove = filteredDataUserNotApprove.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = matchingStores.slice(indexOfFirstData, indexOfLastData);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleImgClick = (imgSrc) => {
    setSelectedImg(imgSrc);
    setShowModal(true);
  };

  const handleEditClick = (id) => {
    setEditId(id);
    setShowEditModal(true);
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
          const response = await AppointmentService.Delete(id);
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
  const handleEditUserClick = (id) => {
    setEditUserId(id);
    setShowEditUserModal(true);
  };

  const handleApproveUserClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = {
          status: "อนุมัติ",
          update_by: dataUser.id,
        };
        try {
          const result = await AppointmentService.Update(id, formData);
          console.log(formData);
          if (result.status) {
            window.location.href = `/manage`;
          }
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCome = (id) => {
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
          action: "ดำเนินการเรียบร้อย",
          update_by: dataUser.id,
        };
        try {
          const result = await AppointmentService.Update(id, formData);
          console.log(formData);
          if (result.status) {
            window.location.href = `/manage`;
          }
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleSuccessApp = (id) => {
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
          action: "ดำเนินการเรียบร้อย",
          update_by: dataUser.id,
        };
        try {
          const result = await AppointmentService.Update(id, formData);
          console.log(formData);
          if (result.status) {
            window.location.href = `/manage`;
          }
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleNotCome = (id) => {
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
          action: "ไม่เข้ามาดำเนินการ",
          update_by: dataUser.id,
        };
        try {
          const result = await AppointmentService.Update(id, formData);
          console.log(formData);
          if (result.status) {
            window.location.href = `/manage`;
          }
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCancelUserClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = {
          status: "รออนุมัติ",
          update_by: dataUser.id,
        };
        try {
          const result = await AppointmentService.Update(id, formData);
          console.log(formData);
          if (result.status) {
            window.location.href = `/manage`;
          }
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <Form className="mt-3">
        <Form.Group controlId="search">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault(); // prevent form submission
                // perform search action here
              }
            }}
          />
        </Form.Group>
      </Form>
      {matchingStores.length === 0 ? (
        <div className="text-center mt-3">
          <Alert variant="danger">
            <Alert.Heading>No results found.</Alert.Heading>
          </Alert>
        </div>
      ) : (
        <>
          <Tabs
            defaultActiveKey="myStore"
            transition={false}
            id="noanim-tab-example"
            className="mb-3 mt-3"
          >
            <Tab eventKey="myStore" title="My Store">
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>status</th>
                    <th>name</th>
                    <th>description</th>
                    <th>address</th>
                    <th>Tel</th>
                    <th>open</th>
                    <th>close</th>
                    <th>lat</th>
                    <th>lon</th>
                    <th>By</th>
                    <th>create_date</th>
                    <th>image</th>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentData.map((store, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{store.status}</td>
                      <td>{store.storeName}</td>
                      <td>{store.storeDetail}</td>
                      <td>{store.storeAddress}</td>
                      <td>{store.storeTel}</td>
                      <td>{store.storeOpen}</td>
                      <td>{store.storeClose}</td>
                      <td>{store.storeLat}</td>
                      <td>{store.storeLon}</td>
                      <td>{store.create_by_name}</td>
                      <td>{store.create_date}</td>
                      <td>
                        <Image
                          rounded
                          thumbnail
                          src={`./${store.storeImg}`}
                          alt={store.storeName}
                          onClick={() => handleImgClick(`./${store.storeImg}`)}
                          style={{
                            cursor: "pointer",
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      </td>
                      <td>
                        <a href="#" onClick={() => handleEditClick(store.id)}>
                          <i className="bi bi-pencil-square"></i>
                        </a>
                      </td>
                      <td>
                        <a href="#" onClick={() => handleDeleteClick(store.id)}>
                          <i className="bi bi-trash"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination
                dataPerPage={dataPerPage}
                totalData={matchingStores.length}
                paginate={paginate}
                currentData={currentData}
              />
            </Tab>
            <Tab eventKey="apApp" title="Approve App">
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>status</th>
                    <th>action</th>
                    <th>Hn</th>
                    <th>animal_name</th>
                    <th>firstname</th>
                    <th>lastname</th>
                    <th>date</th>
                    <th>time</th>
                    <th>remark</th>
                    <th>store_name</th>
                    <th>create_date</th>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                {currentDataUserAprrove &&
                  currentDataUserAprrove.map((user, index) => (
                    <tbody className="text-center">
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.status}</td>
                        <td>{user.action}</td>
                        <td>{user.Hn}</td>
                        <td>{user.animal_name}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.date}</td>
                        <td>{user.time}</td>
                        <td>{user.remark}</td>
                        <td>{user.store_name}</td>
                        <td>{user.create_date}</td>
                        <td>
                          <a
                            href="#"
                            onClick={() => handleEditUserClick(user.id)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            href="#"
                            onClick={() => handleDeleteClick(user.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            href="#"
                            onClick={() => handleApproveUserClick(user.id)}
                          >
                            <i class="bi bi-clipboard-check-fill"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
              <Pagination
                dataPerPage={dataPerPage}
                totalData={filteredDataUserApprove.length}
                paginate={paginate}
                currentData={currentDataUserAprrove}
              />
            </Tab>
            <Tab eventKey="canApp" title="Cancel App">
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>status</th>
                    <th>action</th>
                    <th>Hn</th>
                    <th>animal_name</th>
                    <th>firstname</th>
                    <th>lastname</th>
                    <th>date</th>
                    <th>time</th>
                    <th>remark</th>
                    <th>store_name</th>
                    <th>create_date</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                {currentDataUserNotAprrove &&
                  currentDataUserNotAprrove.map((user, index) => (
                    <tbody className="text-center">
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.status}</td>
                        <td>{user.action}</td>
                        <td>{user.Hn}</td>
                        <td>{user.animal_name}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.date}</td>
                        <td>{user.time}</td>
                        <td>{user.remark}</td>
                        <td>{user.store_name}</td>
                        <td>{user.create_date}</td>
                        <td>
                          <a href="#" onClick={() => handleSuccessApp(user.id)}>
                            <i class="bi bi-check-square-fill"></i>
                          </a>
                        </td>
                        <td>
                          <a onClick={() => handleEditUserClick(user.id)}>
                            <i className="bi bi-pencil-square"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            href="#"
                            onClick={() => handleDeleteClick(user.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            href="#"
                            onClick={() => handleCancelUserClick(user.id)}
                          >
                            <i className="bi bi-clipboard-x-fill"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
              <Pagination
                dataPerPage={dataPerPage}
                totalData={filteredDataUserNotApprove.length}
                paginate={paginate}
                currentData={currentDataUserNotAprrove}
              />
            </Tab>
            <Tab eventKey="action" title="Action App">
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>status</th>
                    <th>action</th>
                    <th>Hn</th>
                    <th>animal_name</th>
                    <th>firstname</th>
                    <th>lastname</th>
                    <th>date</th>
                    <th>time</th>
                    <th>remark</th>
                    <th>store_name</th>
                    <th>create_date</th>
                    <th>update_date</th>
                  </tr>
                </thead>
                {currentDataUserAprroveAll &&
                  currentDataUserAprroveAll.map((user, index) => (
                    <tbody className="text-center">
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.status}</td>
                        <td>{user.action}</td>
                        <td>{user.Hn}</td>
                        <td>{user.animal_name}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.date}</td>
                        <td>{user.time}</td>
                        <td>{user.remark}</td>
                        <td>{user.store_name}</td>
                        <td>{user.create_date}</td>
                        <td>{user.update_date}</td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
              <Pagination
                dataPerPage={dataPerPage}
                totalData={filteredDataUserApproveAll.length}
                paginate={paginate}
                currentData={currentDataUserAprroveAll}
              />
            </Tab>
          </Tabs>
        </>
      )}
      {editUserId && (
        <EditUser
          id={editUserId}
          onClose={() => setEditUserId(null)}
          show={showEditUserModal}
        />
      )}
      {editId && (
        <EditModal
          id={editId}
          onClose={() => setEditId(null)}
          show={showEditModal}
        />
      )}
      <Modal
        centered
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
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
    </>
  );
};

export default Clinic;
