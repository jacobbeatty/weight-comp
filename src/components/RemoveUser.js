import React from "react";
import {useParams} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import {db} from "../firebase-config";
import {deleteDoc, doc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const RemoveUser = () => {
  //get compname from url
  let {compName} = useParams();
  //get uid from user
  const {user} = UserAuth();
  const {uid} = user;
  const navigate = useNavigate();
  // delete user from comp
  const handleRemoveUser = async () => {
    try {
      await deleteDoc(doc(db, compName, uid));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row">
      <p>Are you sure you'd like to leave this competition?</p>
      <button onClick={handleRemoveUser} className="button ml-2">
        Yes
      </button>
    </div>
  );
};

export default RemoveUser;
