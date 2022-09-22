import {React, useEffect} from "react";
import {app} from "../firebase-config";
import {setDoc, doc, getDoc} from "firebase/firestore";
import {db} from "../firebase-config";
import {getAuth} from "firebase/auth";
import {useParams} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const AddData = () => {
  //Grab compName from url
  let {compName} = useParams();
  //Create schema for yup validation
  const schema = yup.object().shape({
    startingWeight: yup
      .number("Must be a number.")
      .typeError("Must be a number.")
      .required("Please include a starting weight.")
      .positive("Must be positive."),
    currentWeight: yup
      .number("Must be a number.")
      .typeError("Must be a number.")
      .required("Please include your current weight.")
      .positive("Must be positive."),
  });
  //Create form hook
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  //Create function to handle form submission
  const auth = getAuth(app);
  const onSubmit = async (e) => {
    const {uid, photoURL, displayName} = auth.currentUser;
    //Calculate weight loss percentage
    const percentageLost = (
      ((e.startingWeight - e.currentWeight) / e.startingWeight) *
      100
    ).toFixed(2);
    //Set a new document in the compName collection with the user's uid as the document name
    await setDoc(doc(db, compName, uid), {
      uid: uid,
      photoURL: photoURL,
      displayName: displayName,
      startingWeight: e.startingWeight,
      currentWeight: e.currentWeight,
      percentageLost: percentageLost,
    });
  };
  useEffect(() => {
    const usersRef = doc(db, compName, getAuth(app).currentUser.uid);
    const getStartingWeight = async () => {
      const snap = await getDoc(usersRef);
      if (snap.exists()) {
        setValue("startingWeight", snap.data().startingWeight);
      } else {
        console.log("No document.");
      }
    };
    getStartingWeight();
  }, [setValue, compName]);
  return (
    <form
      className="form flex-col flex flex-wrap  mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          className="w-[45%] sm:w-[10vw]  border-solid border-2 border-fuchsia-400 "
          placeholder="Starting weight"
          {...register("startingWeight")}
        />
        <input
          className="w-[45%] sm:w-[10vw] border-solid border-2 border-fuchsia-400"
          placeholder="Current weight"
          {...register("currentWeight")}
        />
        <button className="button mt-2" type="submit">
          Submit
        </button>
      </div>
      <p>{errors.startingWeight?.message}</p>
      <p>{errors.currentWeight?.message}</p>
    </form>
  );
};

export default AddData;
