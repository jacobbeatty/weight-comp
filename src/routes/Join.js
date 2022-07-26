import React from "react";
import HomeCard from "../components/HomeCard";

const Join = () => {
  return (
    <div>
      <div className="flex justify-around items-center w-[100vw] h-[100vh]">
        <HomeCard message="Enter your invite code:">
          <input
            className="border-fuchsia-600 border-solid border-2"
            type="text"
            placeholder="Invite Code"
          />
        </HomeCard>
      </div>
    </div>
  );
};

export default Join;
