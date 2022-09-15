import React from "react";
import HomeCard from "../components/HomeCard";
import {db, auth} from "../firebase-config.js";
import {setDoc, doc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const Start = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    compName: yup
      .string()
      .required("Please include a competition name.")
      .min(3, "Competition name must be at least 3 characters long."),
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
    await setDoc(doc(db, e.compName, uid), {
      uid: uid,
      photoURL: photoURL,
      displayName: displayName,
      compName: e.compName,
    });

    navigate(`/comp/${e.compName}`);
  };
  return (
    <div className=" flex justify-around items-center w-[100vw] h-[100vh]">
      <HomeCard message="Name your comp:">
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
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
      </HomeCard>
    </div>
  );
};

export default Start;
