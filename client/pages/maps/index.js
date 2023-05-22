import React from "react";
import styled from "styled-components";
import Header from "next/head";
import { useEffect, useState } from "react";
import Maps from "@/component/Maps";

const PageOverlay = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterFormContainer = styled.div`
  z-index: 1;
  width: 1200px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
`;

export default function index() {
  const [isReady, setIsReady] = useState(0);

  useEffect(() => {
    setIsReady(1);
  }, []);

  return (
    <>
      <Header>
        <title>สมัครสมาชิก | NearMe</title>
      </Header>
      {isReady > 0 ? (
        <PageOverlay>
          <RegisterFormContainer>
            <Maps />
          </RegisterFormContainer>
        </PageOverlay>
      ) : (
        <></>
      )}
    </>
  );
}
