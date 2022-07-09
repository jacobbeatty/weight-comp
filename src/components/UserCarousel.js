import React from "react";
import UserCard from "./UserCard";

const UserCarousel = () => {
  return (
    <div className="flex s flex-col sm:flex-row justify-center h-fit sm:h-[100vh] w-[100%] sm:w[100vw] text-center items-center ">
      <UserCard />
    </div>
  );
};

export default UserCarousel;
