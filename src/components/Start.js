import React from "react";
import {db, auth} from "../firebase-config.js";
import {
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
  query,
  collection,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const Start = () => {
  const navigate = useNavigate();
  //Generate schema for yup validation of form
  const schema = yup.object().shape({
    compName: yup
      .string()
      .trim("⚠️The contact name cannot include leading and trailing spaces")
      .required("⚠️Please include a competition name.")
      .min(3, "⚠️Competition name must be at least 3 characters long.")
      .max(15, "⚠️Competition name must be 15 characters or less."),
  });
  //Generate form hook
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Handle form submission and create a new competition in the database with the given name if it doesn't already exist.
  const onSubmit = async (e) => {
    const {uid, photoURL, displayName} = auth.currentUser;
    //Check if compName exists in db
    const q = query(collection(db, e.compName), limit(1));
    const querySnapshot = await getDocs(q);
    //Check if userInfo exists for the user
    const userInfo = await getDoc(doc(db, "users", uid));
    //If compName isn't in db, add it
    if (querySnapshot.empty) {
      await setDoc(doc(db, e.compName, uid), {
        uid: uid,
        photoURL: photoURL,
        displayName: displayName,
        compName: e.compName,
      });
      //If userInfo doesn't exist for the user, add it
      if (!userInfo.exists()) {
        await setDoc(doc(db, "userInfo", uid), {
          comps: arrayUnion(e.compName),
        });
      } else {
        await updateDoc(doc(db, "userInfo", uid), {
          comps: arrayUnion(e.compName),
        });
      }
      //Add user as admin of comp in compInfo collection in db and create a default endDate for the comp
      //Generate timestamp for endDate 1 week from now
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      await setDoc(doc(db, "compInfo", e.compName), {
        admins: arrayUnion(uid),
        endDate: endDate,
      });
      navigate(`/comp/${e.compName}`);
    } else {
      alert("⚠️Competition name already exists. Please choose another name.⚠️");
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
        <p className="text-white">{errors.compName?.message}</p>
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
