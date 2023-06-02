import React from "react";
import Header from "next/head";
import Card from "../../component/Card";
import Navbar from "@/layout/Navbar/backup2";
import { useEffect, useState } from "react";

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
          <div
            className="container-fluid min-vh-100 row justify-content-around align-items-center "
            style={{
              objectFit: "cover",
              layout: "fill",
              objectPosition: "center",
              marginLeft: 0,
            }}
          >
            <div className="card col-sm-10 col-md-8 col-lg-6 col-8 bg-transparent border-0">
              <div className="card-body">
                <Card />
              </div>
            </div>

            <div
              style={{
                zIndex: -1,
                position: "fixed",
                width: "100vw",
                height: "100vh",
              }}
              className="grid-element"
            ></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
