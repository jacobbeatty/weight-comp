import React from "react";
import {useParams} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import {db} from "../firebase-config";
import {arrayRemove, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const RemoveUser = () => {
  //Grab compName from url
  let {compName} = useParams();
  const {user} = UserAuth();
  const {uid} = user;
  const navigate = useNavigate();
  //Delete user from comp and remove comp from user's list of comps
  const handleRemoveUser = async () => {
    try {
      await deleteDoc(doc(db, compName, uid));
      await updateDoc(doc(db, "userInfo", uid), {
        comps: arrayRemove(compName),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row">
      <p>⚠️Are you sure you'd like to leave this competition?</p>
      <button onClick={handleRemoveUser} className="button ml-2">
        Yes
      </button>
    </div>
  );
};

export default RemoveUser;
