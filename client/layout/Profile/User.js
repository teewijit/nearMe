import Profile from "@/component/Profile";
import VetCard from "@/component/VetCard";
import Appointment from "@/component/Appointment";
import React from "react";
import { Tabs, Tab } from "react-bootstrap";

const User = () => {
  return (
    <Tabs
      defaultActiveKey="pro"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="pro" title="Profile">
        <Profile/>
      </Tab>
      <Tab eventKey="vet" title="Vet Card"><VetCard/></Tab>
      <Tab eventKey="app" title="Appointment"><Appointment/></Tab>
    </Tabs>
  );
};

export default User;
