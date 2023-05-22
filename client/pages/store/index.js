import React from "react";
import styled from "styled-components";
import Header from "next/head";
import { useEffect, useState } from "react";
import FormAddStore from "@/layout/Form/FormAddStore/FormAddStore";
import Navbar from "@/layout/Navbar";

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
        <title>เพิ่มสถานพยาบาล | NearMe</title>
      </Header>
      {isReady > 0 ? (
        <>
          <Navbar />
          <PageOverlay>
            <div className="container-fluid min-vh-100 row justify-content-around mt-5">
              <div className="card col-sm-12 col-md-10 col-lg-8 col-12 border-0">
                <div className="card-body">
                  <FormAddStore />
                </div>
              </div>
            </div>
          </PageOverlay>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
