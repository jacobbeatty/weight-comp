import React from "react";
import { useState, useEffect } from "react";
import { app } from "../firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";

const EditData = () => {
  let { compName } = useParams();
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;
  const usersRef = doc(db, compName, uid);
  const [user, setUser] = useState({});
  const [currentWeight, setCurrentWeight] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const percentageLost = (
      ((user.startingWeight - currentWeight) / user.startingWeight) *
      100
    ).toFixed(2);

    await updateDoc(usersRef, {
      currentWeight: currentWeight,
      percentageLost: percentageLost,
    });

    setCurrentWeight("");
  };

  useEffect(() => {
    const getUser = async () => {
      const snap = await getDoc(usersRef);
      setUser({ uid, ...snap.data() });
    };
    getUser();
  }, []);

  return (
    <form className="form flex flex-wrap  mt-2" onSubmit={handleSubmit}>
      <input
        className="w-[45%] sm:w-[10vw]  border-solid border-2 border-fuchsia-400"
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
