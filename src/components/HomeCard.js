import React from "react";
import { Link } from "react-router-dom";

const HomeCard = (props) => {
  return (
    <div
      href={props.link}
      className=" border-fuchsia-600 rounded-full w-[15vw] h-[15vw] bg-white"
    >
      <div className="flex justify-center items-center h-full flex-col">
        <h1 className="text-xl">{props.message}</h1>
        {props.children}
      </div>
    </div>
  );
};

export default HomeCard;
