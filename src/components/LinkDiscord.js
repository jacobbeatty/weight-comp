import React from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";

const LinkDiscord = () => {
  // e.preventDefault();
  const { uid } = auth.currentUser;
  const randomString = Math.random(1).toString(36).substring(2, 15);

  updateDoc(doc(db, "users", uid), {
    linkCode: randomString,
  });

  return (
    <div className="flex flex-row">
      <p>
        Please provide this message to the weigh-in-bot in a DM to finish
        linking your account:
      </p>
      <p
        className=" cursor-pointer text-fuchsia-400"
        onClick={() => {
          navigator.clipboard.writeText("$link " + randomString);
          alert("Copied to clipboard!");
        }}
      >
        $link {randomString}
      </p>
    </div>
  );
};

export default LinkDiscord;
