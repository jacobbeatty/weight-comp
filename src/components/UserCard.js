import React from "react";
import UserBubble from "./UserBubble";

const UserCard = () => {
  //PULL THIS FROM FIREBASE
  const fetchedImgSrc = "https://jacobbeatty.dev/assets/jake_blur2.jpg";
  return (
    <div className="w-[100vw] h-[45vh]  drop-shadow-xl flex justify-center items-end p-2">
      <img
        className="w-[300px] h-[300px] object-cover m-10 rounded-full absolute opacity-70"
        src={fetchedImgSrc}
        alt=""
      />

      <UserBubble />
    </div>
  );
};

export default UserCard;
