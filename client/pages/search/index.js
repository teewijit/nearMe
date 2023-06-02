import React, { useEffect, useState } from "react";
import Header from "next/head";
import Navbar from "@/layout/Navbar/index";
import Cards from "@/component/Card";
import styled from "styled-components";
import Loader from "@/component/Loader";

const PageOverlay = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export default function index() {
  const [isReady, setIsReady] = useState(0);
  useEffect(() => {
    setIsReady(1);
  }, []);
  return (
    <>
      <Header>
        <title>ค้นหาสถานพยาบาล | NearMe</title>
      </Header>
      {isReady > 0 ? (
        <>
          <Navbar />
          <PageOverlay>
            <Cards />
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
