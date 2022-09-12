import React from "react";
import {useState} from "react";
import {app} from "../firebase-config";
import {setDoc, doc} from "firebase/firestore";
import {db} from "../firebase-config";
import {getAuth} from "firebase/auth";
import {useParams} from "react-router-dom";
import * as yup from "yup";

const AddData = () => {
  let {compName} = useParams();
  const addDataSchema = yup.object().shape({
    startingWeight: yup.number().required().positive().integer(),
    currentWeight: yup.number().required().positive().integer(),
  });

  const [startingWeight, setStartingWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      startingWeight: e.target[0].value,
      currentWeight: e.target[1].value,
    };
    const isValid = await addDataSchema.isValid(data);
    console.log(isValid);

    const {uid, photoURL, displayName} = auth.currentUser;
    //if isValid is true, then add data to db
    if (isValid) {
      const percentageLost = (
        ((startingWeight - currentWeight) / startingWeight) *
        100
      ).toFixed(2);

      await setDoc(doc(db, compName, uid), {
        uid: uid,
        photoURL: photoURL,
        displayName: displayName,
        startingWeight: startingWeight,
        currentWeight: currentWeight,
        percentageLost: percentageLost,
      });
    }

    setCurrentWeight("");
    setStartingWeight("");
  };

  return (
    <form className="form flex flex-wrap  mt-2" onSubmit={handleSubmit}>
      <input
        className="w-[45%] sm:w-[10vw]  border-solid border-2 border-fuchsia-400 "
        placeholder="Starting weight"
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
