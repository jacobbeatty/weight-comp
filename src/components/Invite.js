import {React, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {doc, setDoc, getDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebase-config";

const Invite = () => {
  //Grab compName from url
  let {compName} = useParams();
  const [invite, setInvite] = useState("");
  const randomString = Math.random(1).toString(36).substring(2, 15);

  useEffect(() => {
    const inviteRef = doc(db, "invites", compName);

    const checkInvite = async () => {
      const inviteSnap = await getDoc(inviteRef);
      //If invite code exists, set invite state to invite code
      if (inviteSnap.exists()) {
        //If there is an invite code in the database, use that. Otherwise, generate a new one.
        const inviteFromDB = inviteSnap.data().inviteCode;
        setInvite(inviteFromDB);
      } else {
        // Create a new invite code and add to database
        setDoc(doc(db, "invites", compName), {
          inviteCode: randomString,
          expireAt: Timestamp.fromDate(new Date(Date.now() + 30 * 60 * 1000)),
        });
      }
    };
    checkInvite();
  }, [compName, randomString]);

  return (
    <div>
      <p>Please share this invite link that will expire in 30 minutes: </p>
      <p
        className=" cursor-pointer text-fuchsia-400"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href + "/" + invite);
          alert("Copied to clipboard!");
        }}
      >
        {window.location.href}/{invite}
      </p>
    </div>
  );
};

export default Invite;
