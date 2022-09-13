import React from "react";
import {useState, useEffect} from "react";
import {app} from "../firebase-config";
import {doc, updateDoc, getDoc} from "firebase/firestore";
import {db} from "../firebase-config";
import {getAuth} from "firebase/auth";
import {useParams} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const EditData = () => {
  let {compName} = useParams();
  const schema = yup.object().shape({
    currentWeight: yup.number().required().positive().integer(),
  });
  const {register, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  const auth = getAuth(app);
  const uid = auth.currentUser.uid;
  const usersRef = doc(db, compName, uid);
  const [user, setUser] = useState({});
  const onSubmit = async (e) => {
    const percentageLost = (
      ((user.startingWeight - e.currentWeight) / user.startingWeight) *
      100
    ).toFixed(2);

    await updateDoc(usersRef, {
      currentWeight: e.currentWeight,
      percentageLost: percentageLost,
    });
  };

  useEffect(() => {
    const getUser = async () => {
      const snap = await getDoc(usersRef);
      setUser({uid, ...snap.data()});
    };
    getUser();
  }, []);

  return (
    <form
      className="form flex flex-wrap  mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="w-[45%] sm:w-[10vw]  border-solid border-2 border-fuchsia-400"
        placeholder="Current Weight"
        {...register("currentWeight")}
      />
      <button className="button mt-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default EditData;
