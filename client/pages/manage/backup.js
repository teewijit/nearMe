import React, { useEffect, useState } from "react";
import Header from "next/head";
import Navbar from "@/layout/Navbar/backup2";
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
            <div className="card-body">
              <RoleComponent />
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
