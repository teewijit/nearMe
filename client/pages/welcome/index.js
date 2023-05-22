import React from "react";
import Link from "next/link";
import CardSlider from "../../component/CardSlider";

const Welcome = () => {
  const navigations = [
    {
      label: "Search",
      path: "/search",
      className: "btn btn-outline-success btn-lg",
    },
    {
      label: "Login",
      path: "/login",
      className: "btn btn-outline-primary btn-lg",
    },
  ];

  return (
    <>
      <div className="col-lg mb-5 mt-5">
        <h1 className="text-uppercase" style={{ opacity: 100 }}>
          NearMe
        </h1>
        <div className="mb-1">
          <span className="text-center">
            Find an animal hospital near you.{" "}
            <i className="bi bi-search-heart"></i>
          </span>
        </div>
      </div>

      <div
        className="container rounded row jutify-content-center"
        style={{
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          margin: 0,
        }}
      >
        <CardSlider />
      </div>

      <div className="d-flex justify-content-evenly mt-5">
        {navigations.map((nav, index) => (
          <Link href={nav.path} key={index}>
            <button className={nav.className}>{nav.label}</button>
          </Link>
        ))}
      </div>

      <div className="row justify-content-center">
        <div className="card bg-transparent border-0">
          <div className="card-body text-center">
            <span>
              Not have a member ?
              <Link href="/register">
                <span className="text-primary">Register</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
