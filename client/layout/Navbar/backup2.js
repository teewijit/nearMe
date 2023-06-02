import React, { useState, useEffect } from "react";
import { setData, setError, setLoading } from "@/store/slices/usersSlice";
import AuthService from "@/service/AuthService";
import UserService from "@/service/UserService";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the navbar horizontally */
`;

const Content = styled.div`
  flex-grow: 1;
  padding-bottom: 60px; /* Adjust this value to accommodate the navbar height */
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  height: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: 1rem;
  margin-right: 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top: 1px solid #ddd;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const NavbarItemCenter = styled.a`
  text-decoration: none;
  color: ${(props) => (props.isActive ? "#1977cc" : "black")};
  font-weight: bold;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; /* Adjust the padding to fit the content within the curved shape */
  transition: color 0.3s ease; /* Add a transition effect for smoother color change */

  .icon {
    margin-bottom: 3px;
    font-size: 20px; // Increase the icon size to 20px
  }
`;
const NavbarItem = styled.a`
  text-decoration: none;
  color: ${(props) => (props.isActive ? "#1977cc" : "black")};
  font-weight: bold;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: color 0.3s ease;

  .icon {
    margin-bottom: 3px;
    font-size: 20px;
  }
`;

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
    <Container>
      <Navbar>
        {data && data.role_id === 1 && (
          <>
            <NavbarItem
              href="../manage"
              className={router.pathname === "/manage" ? "active" : ""}
              isActive={activeItem === "manage"}
              onClick={() => handleItemClick("manage")}
            >
              <i className="bi bi-person-square"></i>Manage Admin
            </NavbarItem>
            <NavbarItemCenter
              href="../search"
              className={activeItem === "search" ? "active" : ""}
              isActive={activeItem === "search"}
              onClick={() => handleItemClick("search")}
            >
              <i className="bi bi-search"></i>Search
            </NavbarItemCenter>
            <NavbarItem
              href="../store"
              className={activeItem === "store" ? "active" : ""}
              isActive={activeItem === "store"}
              onClick={() => handleItemClick("store")}
            >
              เพิ่มคลินิก
            </NavbarItem>
          </>
        )}
        {data && data.role_id === 2 && (
          <>
            <NavbarItem
              href="../manage"
              className={router.pathname === "/manage" ? "active" : ""}
              isActive={router.pathname === "/manage"}
              onClick={() => handleItemClick("manage")}
            >
              <i className="bi bi-person-square icon"></i>Profile
            </NavbarItem>
            <NavbarItemCenter
              href="../search"
              isActive={router.pathname === "/search"}
              onClick={() => handleItemClick("search")}
            >
              <i className="bi bi-search icon"></i>Search
            </NavbarItemCenter>
            <NavbarItem
              href="../manage"
              className={router.pathname === "/manage" ? "active" : ""}
              isActive={router.pathname === "/manage"}
              onClick={() => handleItemClick("manage")}
            >
              <i className="bi bi-credit-card-2-back-fill icon"></i>Vet Card
            </NavbarItem>
          </>
        )}
        {data && data.role_id === 3 && (
          <>
            <NavbarItem
              href="../manage"
              className={activeItem === "manage" ? "active" : ""}
              isActive={activeItem === "manage"}
              onClick={() => handleItemClick("manage")}
            >
              <i className="bi bi-person-square"></i>Manage Clinic
            </NavbarItem>
            <NavbarItemCenter
              href="../search"
              className={activeItem === "search" ? "active" : ""}
              isActive={activeItem === "search"}
              onClick={() => handleItemClick("search")}
            >
              <i className="bi bi-search"></i>Search
            </NavbarItemCenter>
            <NavbarItem
              href="../store"
              className={activeItem === "search" ? "active" : ""}
              isActive={activeItem === "search"}
              onClick={() => handleItemClick("search")}
            >
              เพิ่มคลินิก
            </NavbarItem>
          </>
        )}
      </Navbar>
    </Container>
  );
}

export default CustomNavbar;
