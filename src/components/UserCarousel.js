import React from "react";
import UserCard from "./UserCard";
import JoinCard from "./JoinCard";

const UserCarousel = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center h-fit sm:h-[100vh] w-[100%] sm:w[100vw] text-center items-center ">
      <UserCard />
      <UserCard />
      <JoinCard />
    </div>
  );
};

export default UserCarousel;
