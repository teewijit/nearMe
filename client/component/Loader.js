import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const LoaderOverlay = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loader() {
  const [isReady, setIsReady] = useState(0);
  useEffect(() => {
    setIsReady(1);
  }, []);
  return isReady > 0 ? (
    <>
      <LoaderOverlay>
        <Spinner animation="grow" variant="success" />
      </LoaderOverlay>
    </>
  ) : (
    <></>
  );
}
