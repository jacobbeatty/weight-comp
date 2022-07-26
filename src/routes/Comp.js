import React from "react";
import Navbar from "../components/Navbar";
import UserCarousel from "../components/UserCarousel";
import { useParams } from "react-router-dom";

const Comp = () => {
  return (
    <div>
      <Navbar />
      <UserCarousel />
    </div>
  );
};

export default Comp;
