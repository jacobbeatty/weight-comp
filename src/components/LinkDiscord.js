import {React} from "react";
import {useParams} from "react-router-dom";
import {updateDoc, doc} from "firebase/firestore";
import {db, auth} from "../firebase-config";

const LinkDiscord = () => {
  //Grab compName from url
  let {compName} = useParams();
  const {uid} = auth.currentUser;
  //Generate random string for link code
  const randomString = Math.random(1).toString(36).substring(2, 15);
  //Update link code in database
  updateDoc(doc(db, compName, uid), {
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
