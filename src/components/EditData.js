import React from "react";
import { useState, useEffect } from "react";
import { app } from "../firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth } from "firebase/auth";

const EditData = (props) => {
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;

  const usersRef = doc(db, "users", uid);
  const [user, setUser] = useState({});

  //   const [startingWeight, setStartingWeight] = useState(user.startingWeight);
  const [currentWeight, setCurrentWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const percentageLost =
      ((user.startingWeight - currentWeight) / user.startingWeight) * 100;

    console.log(percentageLost);

    await updateDoc(usersRef, {
      currentWeight: currentWeight,
      percentageLost: percentageLost,
    });

    setCurrentWeight("");
    // setStartingWeight("");
  };

  useEffect(() => {
    const getUser = async () => {
      const snap = await getDoc(usersRef);
      setUser({ uid, ...snap.data() });
    };
    getUser();
  }, []);

  console.log(usersRef);
  return (
    <form
      className="form flex flex-wrap justify-between mt-2"
      onSubmit={handleSubmit}
    >
      <input
        className="w-[45%]"
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

export default EditData;
