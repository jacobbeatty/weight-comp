import React from "react";
import { useState } from "react";
import { app } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth } from "firebase/auth";

const AddData = () => {
  const [startingWeight, setStartingWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;
    const percentageLost =
      ((startingWeight - currentWeight) / startingWeight) * 100;

    await setDoc(doc(db, "users", uid), {
      uid: uid,
      photoURL: photoURL,
      displayName: displayName,
      startingWeight: startingWeight,
      currentWeight: currentWeight,
      percentageLost: percentageLost,
    });

    setCurrentWeight("");
    setStartingWeight("");
  };

  return (
    <form className="form flex flex-wrap  mt-2" onSubmit={handleSubmit}>
      <input
        className="w-[45%] sm:w-[10vw]  border-solid border-2 border-fuchsia-400 "
        placeholder="Start weight"
        value={startingWeight}
        onChange={(e) => setStartingWeight(e.target.value)}
      />
      <input
        className="w-[45%] sm:w-[10vw] border-solid border-2 border-fuchsia-400"
        placeholder="Current Weight"
        value={currentWeight}
        onChange={(e) => setCurrentWeight(e.target.value)}
      />
      <button className="button mt-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddData;
