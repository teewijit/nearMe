import React, { useState, useEffect } from "react";
import { setData, setError, setLoading } from "@/store/slices/usersSlice";
import AuthService from "@/service/AuthService";
import UserService from "@/service/UserService";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Navbar, Nav } from "react-bootstrap";

function CustomNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);
  useEffect(() => {
    async function fetchProfile() {
      try {
        dispatch(setLoading(true));
        const getProfile = await UserService.getProfile();
        if (getProfile) {
          dispatch(setData(getProfile.data));
        } else {
          dispatch(setError("An error occurred while fetching the data."));
        }
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProfile();
  }, [router.pathname]);

  const handleLogout = async () => {
    let result = await AuthService.SignOut();
    if (result.status) {
      window.location.href = "/";
    }
  };

  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return isLoading ? (
    <></>
  ) : (
    <Navbar expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          {data && data.role_id === 1 && (
            <>
              <Nav.Link
                href="../manage"
                className={router.pathname === "/manage" ? "active" : ""}
                isActive={activeItem === "manage"}
                onClick={() => handleItemClick("manage")}
              >
                <i className="bi bi-person-square"></i>Manage Admin
              </Nav.Link>
              <Nav.Link
                href="../search"
                className={activeItem === "search" ? "active" : ""}
                isActive={activeItem === "search"}
                onClick={() => handleItemClick("search")}
              >
                <i className="bi bi-search"></i>Search
              </Nav.Link>
              <Nav.Link
                href="../store"
                className={activeItem === "store" ? "active" : ""}
                isActive={activeItem === "store"}
                onClick={() => handleItemClick("store")}
              >
                เพิ่มคลินิก
              </Nav.Link>
            </>
          )}
          {data && data.role_id === 2 && (
            <>
              <Nav.Link
                href="../manage"
                className={router.pathname === "/manage" ? "active" : ""}
                isActive={router.pathname === "/manage"}
                onClick={() => handleItemClick("manage")}
              >
                <i className="bi bi-person-square icon"></i>Profile
              </Nav.Link>
              <Nav.Link
                href="../search"
                isActive={router.pathname === "/search"}
                onClick={() => handleItemClick("search")}
              >
                <i className="bi bi-search icon"></i>Search
              </Nav.Link>
              {/* <Nav.Link
                href="../manage"
                className={router.pathname === "/manage" ? "active" : ""}
                isActive={router.pathname === "/manage"}
                onClick={() => handleItemClick("manage")}
              >
                <i className="bi bi-credit-card-2-back-fill icon"></i>Vet Card
              </Nav.Link> */}
            </>
          )}
          {data && data.role_id === 3 && (
            <>
              <Nav.Link
                href="../manage"
                className={activeItem === "manage" ? "active" : ""}
                isActive={activeItem === "manage"}
                onClick={() => handleItemClick("manage")}
              >
                <i className="bi bi-person-square"></i>Manage Clinic
              </Nav.Link>
              <Nav.Link
                href="../search"
                className={activeItem === "search" ? "active" : ""}
                isActive={activeItem === "search"}
                onClick={() => handleItemClick("search")}
              >
                <i className="bi bi-search"></i>Search
              </Nav.Link>
              <Nav.Link
                href="../store"
                className={activeItem === "search" ? "active" : ""}
                isActive={activeItem === "search"}
                onClick={() => handleItemClick("search")}
              >
                เพิ่มคลินิก
              </Nav.Link>
            </>
          )}
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
