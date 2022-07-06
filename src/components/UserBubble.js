import React from "react";

const UserBubble = () => {
  //PULL THIS FROM FIREBASE
  const userName = "User";
  const percentageLost = "5";
  return (
    <div className="w-[100px] h-[100px] flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-full text-center z-50">
      <p className="!opacity-100 text-white">
        {userName} has lost {percentageLost}%.
      </p>
    </div>
  );
};

export default UserBubble;
