import React from "react";
import HomeCard from "../components/HomeCard";
import {db, auth} from "../firebase-config.js";
import {
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
  query,
  collection,
  limit,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const Start = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    compName: yup
      .string()
      .trim("The contact name cannot include leading and trailing spaces")
      .required("Please include a competition name.")
      .min(3, "Competition name must be at least 3 characters long.")
      .max(15, "Competition name must be 15 characters or less."),
  });
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (e) => {
    const {uid, photoURL, displayName} = auth.currentUser;

    //check if compName exists in db
    const snapshot = await query(collection(db, e.compName), limit(1));

    if (snapshot.empty) {
      await setDoc(doc(db, e.compName, uid), {
        uid: uid,
        photoURL: photoURL,
        displayName: displayName,
        compName: e.compName,
      });
      await updateDoc(doc(db, "userInfo", uid), {
        comps: arrayUnion(e.compName),
      });
      navigate(`/comp/${e.compName}`);
    } else {
      alert("Competition name already exists. Please choose another name.");
    }
  };
  return (
    <div className=" flex flex-col sm:flex-row justify-around items-center w-fit ">
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-white text-2xl font-semibold">
          Start a Competition:
        </h1>

        <input
          className="border-fuchsia-600 border-solid border-2"
          type="text"
          placeholder="Comp Name"
          {...register("compName")}
        />
        <p>{errors.compName?.message}</p>
        <button
          type="submit"
          value="GO"
          className="bg-fuchsia-600 text-white p-2 m-2 rounded-full"
        >
          GO
        </button>
      </form>
    </div>
  );
};

export default Start;
