import React from "react";
import HomeCard from "../components/HomeCard";
import { app, db, auth } from "../firebase-config.js";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [inviteCode, setInviteCode] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryRef = usersRef.where("inviteCode", "==", inviteCode);
    const docName = await queryRef.get();

    setInviteCode("");
  };

  return (
    <div>
      <div className="flex justify-around items-center w-[100vw] h-[100vh]">
        <HomeCard message="Enter your invite code:">
          <form onSubmit={handleSubmit}>
            <input
              className="border-fuchsia-600 border-solid border-2"
              type="text"
              value={inviteCode}
              placeholder="Invite Code"
            />
          </form>
        </HomeCard>
      </div>
    </div>
  );
};

export default Join;
