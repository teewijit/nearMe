import React, { useEffect, useState } from "react";
import Header from "next/head";
import Login from "@/layout/Form/FormLogin/FormLogin";
import styled from "styled-components";
import Loader from "@/component/Loader";

const PageOverlay = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFormContainer = styled.div`
  z-index: 1;
  width: 400px;
  min-height: 100px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);

  .logo-container {
    width: 150px;
    height: 210px;
    margin: 0 auto;
  }

  button {
    width: 150px;
    height: 50px;
  }

  h1 {
    text-align: center;
    padding: 1rem;
  }
`;

export default function index() {
  const [isReady, setIsReady] = useState(0);
  useEffect(() => {
    setIsReady(1);
  }, []);
  return (
    <>
      <Header>
        <title>ยินดีต้อนรับ | NearMe</title>
      </Header>
      {isReady > 0 ? (
        <PageOverlay>
          <LoginFormContainer>
            <h1>Login</h1>
            <Login />
          </LoginFormContainer>
        </PageOverlay>
      ) : (
        <>
        <Loader/>
        </>
      )}
    </>
  );
}
