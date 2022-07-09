import React from "react";
import UserCard from "./UserCard";

const UserCarousel = () => {
  return (
    <div className="flex s flex-col sm:flex-row sm:flex-wrap justify-center h-fit sm:h-[80vh] w-[100%] sm:w[100vw] text-center items-center ">
      <UserCard />
    </div>
  );
};

export default UserCarousel;
