import React, { useEffect, useState } from "react";
import Header from "next/head";
import Navbar from "@/layout/Navbar/index";
import RoleComponent from "@/component/RoleComponent";
import styled from "styled-components";
import Loader from "@/component/Loader";

const PageOverlay = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function index() {
  const [isReady, setIsReady] = useState(0);
  useEffect(() => {
    setIsReady(1);
  }, []);
  return (
    <>
      <Header>
        <title>จัดการข้อมูล | NearMe</title>
      </Header>
      {isReady > 0 ? (
        <>
          <Navbar />
          <PageOverlay>
            <div className="container-fluid min-vh-100 row justify-content-around mt-5">
              <div className="card col-sm-10 col-lg-10 col-10 border-0">
                <div className="card-body">
                  <RoleComponent />
                </div>
              </div>
            </div>
          </PageOverlay>
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
}
