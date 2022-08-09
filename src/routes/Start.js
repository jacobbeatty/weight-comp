import React from "react";
import HomeCard from "../components/HomeCard";
import { app, db, auth } from "../firebase-config.js";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const [compName, setCompName] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;

    console.log(compName);

    await setDoc(doc(db, compName, uid), {
      uid: uid,
      photoURL: photoURL,
      displayName: displayName,
      compName: compName,
    });
    setCompName("");
    navigate(`/comp/${compName}`);
  };
  return (
    <div className=" flex justify-around items-center w-[100vw] h-[100vh]">
      <HomeCard message="Name your comp:">
        <form onSubmit={handleSubmit}>
          <input
            className="border-fuchsia-600 border-solid border-2"
            type="text"
            placeholder="Comp Name"
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
          />
          <button
            type="submit"
            value="GO"
            className="bg-fuchsia-600 text-white p-2 m-2 rounded-full"
          >
            GO
          </button>
        </form>
      </HomeCard>
    </div>
  );
};

export default Start;
