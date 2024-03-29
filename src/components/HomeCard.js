import React from "react";

const HomeCard = (props) => {
  return (
    <div
      href={props.link}
      className=" border-fuchsia-600 rounded-full w-[50vw] sm:w-[15vw] h-[50vw] sm:h-[15vw] bg-white"
    >
      <div className="flex justify-center items-center h-full flex-col">
        <h1 className="">{props.message}</h1>
        {props.children}
      </div>
    </div>
  );
};

export default HomeCard;
