import React from "react";
import { useParams } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const Invite = () => {
  let { compName } = useParams();
  const { uid } = auth.currentUser;

  const randomString = Math.random(1).toString(36).substring(2, 15);

  updateDoc(doc(db, compName, uid), {
    inviteCode: randomString,
  });
  return (
    <div>
      <h1>Invite</h1>
      <p>Please share this invite code that can only be used once:</p>
      <p
        className=" cursor-pointer text-fuchsia-400"
        onClick={() => {
          navigator.clipboard.writeText(randomString);
          alert("Copied to clipboard!");
        }}
      >
        {randomString}
      </p>
    </div>
  );
};

export default Invite;
