import {React, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {doc, setDoc, getDoc, Timestamp} from "firebase/firestore";
import {db, auth} from "../firebase-config";

const Invite = () => {
  let {compName} = useParams();
  const {uid} = auth.currentUser;

  const [invite, setInvite] = useState("");
  const randomString = Math.random(1).toString(36).substring(2, 15);
  const inviteRef = doc(db, "invites", compName);

  useEffect(() => {
    const checkInvite = async () => {
      const inviteSnap = await getDoc(inviteRef);

      if (inviteSnap.exists()) {
        //if there is an invite code in the database, use that. Otherwise, generate a new one.
        const inviteFromDB = inviteSnap.data().inviteCode;
        setInvite(inviteFromDB);
      } else {
        // Create a new invite code and add to database
        console.log("No invite for this document.");

        setDoc(doc(db, "invites", compName), {
          inviteCode: randomString,
          expireAt: Timestamp.fromDate(new Date(Date.now() + 30 * 60 * 1000)),
        });
      }
    };
    checkInvite();
  }, []);

  return (
    <div>
      <p>Please share this invite link that will expire in 30 minutes: </p>
      <p
        className=" cursor-pointer text-fuchsia-400"
        onClick={() => {
          navigator.clipboard.writeText(
            window.location.href + "/comp/" + compName + "/" + invite
          );
          alert("Copied to clipboard!");
        }}
      >
        {window.location.href}/comp/{compName}/{invite}
      </p>
    </div>
  );
};

export default Invite;
