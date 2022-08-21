import {React, useEffect, useState} from "react";
import {UserAuth} from "../context/AuthContext";

import Navbar from "../components/Navbar";
import UserCarousel from "../components/UserCarousel";
import {useParams} from "react-router-dom";
import {db, app} from "../firebase-config";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";

import {getDoc, setDoc, doc} from "firebase/firestore";

const Comp = () => {
  const navigate = useNavigate();

  let {compName} = useParams();
  let {inviteCode} = useParams();

  const {user} = UserAuth();

  const {uid, displayName, photoURL} = user;

  const compRef = doc(db, "invites", compName);
  const checkInvite = async () => {
    const comp = await getDoc(compRef);
    //catch error if no invite code is found
    try {
      const inviteInDb = comp.data().inviteCode;
      console.log(inviteInDb);
      if (inviteInDb === inviteCode) {
        await setDoc(doc(db, compName, uid), {
          uid: uid,
          photoURL: photoURL,
          displayName: displayName,
          compName: compName,
          test: "test",
        });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  checkInvite();

  return (
    <div>
      <Navbar />
      <UserCarousel />
    </div>
  );
};

export default Comp;
