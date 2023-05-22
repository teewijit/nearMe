import React, { useState, useEffect } from "react";
import { Button, NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import { setData, setError, setLoading } from "@/store/slices/usersSlice";
import AuthService from "@/service/AuthService";
import UserService from "@/service/UserService";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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
  return isLoading ? (
    <></>
  ) : (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {data && data.role_id === 1 && (
              <>
                <Nav.Link href="../manage">Manage Admin</Nav.Link>
                <Nav.Link href="../store">เพิ่มคลินิก</Nav.Link>
                <Nav.Link href="../search">ค้นหาคลินิก</Nav.Link>
              </>
            )}
            {data && data.role_id === 2 && (
              <>
                <Nav.Link href="../manage">Manage User</Nav.Link>
                <Nav.Link href="../search">ค้นหาคลินิก</Nav.Link>
              </>
            )}
            {data && data.role_id === 3 && (
              <>
                <Nav.Link href="../manage">Manage Clinic</Nav.Link>
                <Nav.Link href="../store">เพิ่มคลินิก</Nav.Link>
                <Nav.Link href="../search">ค้นหาคลินิก</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
