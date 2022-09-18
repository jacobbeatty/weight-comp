import {React, useEffect, useState} from "react";
import {UserAuth} from "../context/AuthContext";
import Navbar from "../components/Navbar";
import UserCarousel from "../components/UserCarousel";
import {useParams} from "react-router-dom";
import {db} from "../firebase-config";
import {useNavigate} from "react-router-dom";
import {getDoc, setDoc, doc, updateDoc, arrayUnion} from "firebase/firestore";

const Comp = () => {
  const navigate = useNavigate();
  //Grabbed from URL
  let {compName} = useParams();
  let {inviteCode} = useParams();
  const {user} = UserAuth();

  useEffect(() => {
    if (!user) return;

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
          await setDoc(
            doc(db, "userInfo", uid),
            {
              comps: arrayUnion(compName),
            },
            {merge: true}
          );
          navigate(`/comp/${compName}`);
        } else if (!inviteCode) {
          navigate(`/comp/${compName}`);
        } else {
          console.log("wrong invite code");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkInvite();
    const checkUserInComp = async () => {
      try {
        const userRef = doc(db, compName, uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists() && !inviteCode) {
          navigate("/");
        } else {
          console.log("user in comp");
        }
      } catch (error) {
        console.log(error);
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
