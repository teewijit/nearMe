import React, { useState, useEffect } from "react";
import { Alert, Table, Modal, Image, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import EditModal from "@/component/Modal/EditModal";
import EditUser from "@/component/Modal/EditUser";
import StoreService from "@/service/StoreService";
import AddClinicModal from "@/component/Modal/AddClinicModal";
import Swal from "sweetalert2";
import Pagination from "@/component/Pagination";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserService from "@/service/UserService";
import AppointmentService from "@/service/AppointmentService";

const Admin = () => {
  const { data, isLoading, error } = useSelector((state) => state.stores);
  const { data: dataAdmin } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [userPending, setUserPending] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [appPending, setAppPending] = useState([]);

  const handleImgClick = (imgSrc) => {
    setSelectedImg(imgSrc);
    setShowModal(true);
  };
  useEffect(() => {
    const fetchStoreData = async () => {
      const response = await UserService.getAll();
      setUserPending(response.data);
    };
    fetchStoreData();
  }, []);

  useEffect(() => {
    const fetchStoreData = async () => {
      const response = await AppointmentService.Search();
      console.log(response);
      setAppPending(response.data);
    };
    fetchStoreData();
  }, []);


  const DataAppPending =
    appPending && appPending.filter((user) => user.status === "รออนุมัติ");
  const filteredDataAppPending = DataAppPending.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const DataAppAprrove =
    appPending && appPending.filter((user) => user.approve === "อนุมัติ");
  const filteredDataAppAprrove = DataAppAprrove.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const DataUserPending =
    userPending && userPending.filter((user) => user.approve === 0);
  const filteredDataUserPending = DataUserPending.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const DataUserAprrove =
    userPending && userPending.filter((user) => user.approve === 1);
  const filteredDataUserApprove = DataUserAprrove.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const dataNotApprove =
    data && data.filter((store) => store.status === "notApprove");
  const filteredDataNotApprove = dataNotApprove.filter((store) =>
    Object.values(store).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const dataApprove =
    data && data.filter((store) => store.status === "approve");
  const filteredDataApprove = dataApprove.filter((store) =>
    Object.values(store).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [editUserId, setEditUserId] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleEditUserClick = (id) => {
    setEditUserId(id);
    setShowEditUserModal(true);
  };

  const [editId, setEditId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (id) => {
    setEditId(id);
    setShowEditModal(true);
  };

  const [showAddClniicModal, setShowAddClniicModal] = useState(false);
  const handleAddClinicClick = () => {
    setShowAddClniicModal(true);
  };

  const [deleteId, setDeleteId] = useState(null);

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
          const response = await StoreService.Delete(id);
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

  const handleDeleteUserClick = (id) => {
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
          const response = await UserService.Delete(id);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(4);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const currentDataAppPending = filteredDataAppPending.slice(
    indexOfFirstData,
    indexOfLastData
  );
  const currentDataUserAprrove = filteredDataUserApprove.slice(
    indexOfFirstData,
    indexOfLastData
  );
  const currentDataUserPending = filteredDataUserPending.slice(
    indexOfFirstData,
    indexOfLastData
  );
  const currentDataNotApprove = filteredDataNotApprove.slice(
    indexOfFirstData,
    indexOfLastData
  );
  const currentDataApprove = filteredDataApprove.slice(
    indexOfFirstData,
    indexOfLastData
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCancelUserClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = {
          approve: 0,
          update_by: dataAdmin.id,
        };
        try {
          const result = await UserService.Update(id, formData);
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

  const handleApproveUserClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = {
          approve: 1,
          create_by: dataAdmin.id,
          update_by: dataAdmin.id,
        };
        try {
          const result = await UserService.Update(id, formData);
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

  const handleApproveClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = {
          status: "approve",
          update_by: dataAdmin.id,
        };
        console.log(formData);
        try {
          const result = await StoreService.Update(id, formData);
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

  const handleNotApproveClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, not approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("status", "notApprove");
        try {
          const result = await StoreService.Update(id, formData);
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
      <Form className="mb-3">
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
      <Tabs
        defaultActiveKey="ap"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="ap" title="Approve">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th></th>
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
                <td></td>
              </tr>
            </thead>
            {currentDataApprove &&
              currentDataApprove.map((store, index) => (
                <tbody className="text-center">
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
                    <td>
                      <a
                        href="#"
                        onClick={() => handleNotApproveClick(store.id)}
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
            totalData={filteredDataApprove.length}
            paginate={paginate}
            currentData={currentDataApprove}
          />
        </Tab>
        <Tab eventKey="nap" title="Not Approve">
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th></th>
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
                <td></td>
              </tr>
            </thead>
            {currentDataNotApprove &&
              currentDataNotApprove.map((store, index) => (
                <tbody className="text-center">
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
                        src={
                          store.storeImg ? `./${store.storeImg}` : "./noImg.jpg"
                        }
                        alt={store.storeName}
                        onClick={() =>
                          handleImgClick(
                            `./${store.storeImg
                              ? `./${store.storeImg}`
                              : "./noImg.jpg"
                            }`
                          )
                        }
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
                    <td>
                      <a href="#" onClick={() => handleApproveClick(store.id)}>
                        <i class="bi bi-clipboard-check-fill"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={filteredDataNotApprove.length}
            paginate={paginate}
            currentData={currentDataNotApprove}
          />
        </Tab>
        <Tab eventKey="apu" title="Approve User">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>status</th>
                <th>username</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>birthday</th>
                <th>sex</th>
                <th>role</th>
                <th>By</th>
                <th>create_date</th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            {currentDataUserPending &&
              currentDataUserPending.map((user, index) => (
                <tbody className="text-center">
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.approve === 0 ? "รออนุมัติ" : "อนุมัติ"}</td>
                    <td>{user.username}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.brithday}</td>
                    <td>{user.sex}</td>
                    <td>{user.role_id}</td>
                    <td>{user.create_by_name}</td>
                    <td>{user.create_date}</td>
                    <td>
                      <a href="#" onClick={() => handleEditUserClick(user.id)}>
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </td>
                    <td>
                      <a
                        href="#"
                        onClick={() => handleDeleteUserClick(user.id)}
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
            totalData={filteredDataUserPending.length}
            paginate={paginate}
            currentData={currentDataUserPending}
          />
        </Tab>
        <Tab eventKey="can" title="Cancel User">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>status</th>
                <th>username</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>birthday</th>
                <th>sex</th>
                <th>role</th>
                <th>By</th>
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
                    <td>{user.approve === 0 ? "รออนุมัติ" : "อนุมัติ"}</td>
                    <td>{user.username}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.brithday}</td>
                    <td>{user.sex}</td>
                    <td>{user.role_id}</td>
                    <td>{user.create_by_name}</td>
                    <td>{user.create_date}</td>
                    <td>
                      <a href="#" onClick={() => handleEditUserClick(user.id)}>
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </td>
                    <td>
                      <a href="#" onClick={() => handleDeleteClick(user.id)}>
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
            totalData={filteredDataUserApprove.length}
            paginate={paginate}
            currentData={currentDataUserAprrove}
          />
        </Tab>
      </Tabs>
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
      {showAddClniicModal && (
        <AddClinicModal
          onClose={() => setShowAddClniicModal(false)}
          show={showAddClniicModal}
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

export default Admin;
