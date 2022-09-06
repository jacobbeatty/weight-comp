import {React, useEffect, useState} from "react";
import {UserAuth} from "../context/AuthContext";

import Navbar from "../components/Navbar";
import UserCarousel from "../components/UserCarousel";
import {useParams} from "react-router-dom";
import {db, app, auth} from "../firebase-config";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

import {getDoc, setDoc, doc} from "firebase/firestore";

const Comp = () => {
  const navigate = useNavigate();
  //Grabbed from URL
  let {compName} = useParams();
  let {inviteCode} = useParams();

  const {user} = UserAuth();

  const {uid, displayName, photoURL} = user;

  //user in comp test
  const compRef = doc(db, "invites", compName);
  const checkInvite = async () => {
    const comp = await getDoc(compRef);
    //catch error if no invite code is found
    try {
      const inviteInDb = comp.data().inviteCode;
      console.log(inviteInDb);
      console.log(uid);
      if (inviteCode && inviteInDb === inviteCode) {
        await setDoc(doc(db, compName, uid), {
          uid: uid,
          photoURL: photoURL,
          displayName: displayName,
          compName: compName,
          test: "test",
        });
      } else if (!inviteCode) {
        navigate(`/comp/${compName}`);
      } else {
        //THIS IS MESSED UP
        console.log("wrong invite code");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return; // 👈 Add this line

    checkInvite();
    const checkUserInComp = async () => {
      const userRef = doc(db, compName, uid);

      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        navigate("/");
      } else {
        console.log("user in comp");
      }
    };
    checkUserInComp();
  }, [user]);

  return (
    <div>
      <Navbar />
      <UserCarousel />
    </div>
  );
};

export default Comp;
