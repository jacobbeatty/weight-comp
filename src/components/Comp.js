import {React, useEffect} from "react";
import {UserAuth} from "../context/AuthContext";
import Navbar from "../components/Navbar";
import UserCarousel from "../components/UserCarousel";
import {useParams} from "react-router-dom";
import {db} from "../firebase-config";
import {useNavigate} from "react-router-dom";
import {getDoc, setDoc, doc, arrayUnion} from "firebase/firestore";
import Transitions from "./Transitions";

const Comp = () => {
  const navigate = useNavigate();
  //Grab compName and inviteCode from url
  let {compName} = useParams();
  let {inviteCode} = useParams();
  const {user} = UserAuth();
  //Handle ability for user to access comp either by invite or by already being a part of the comp.
  useEffect(() => {
    //If the user is not logged in, redirect them to the login page.
    if (!user) return;
    const {uid, displayName, photoURL} = user;
    //Check for valid invite code
    const compRef = doc(db, "invites", compName);
    const checkInvite = async () => {
      const comp = await getDoc(compRef);
      //Catch error if no invite code is found
      try {
        const inviteInDb = comp.data().inviteCode;
        //If the invite code is valid, add the user to the comp and redirect them to the comp page.
        if (inviteCode && inviteInDb === inviteCode) {
          await setDoc(doc(db, compName, uid), {
            uid: uid,
            photoURL: photoURL,
            displayName: displayName,
            compName: compName,
            test: "test",
          });
          //Generate doc in userInfo collection for user
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
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkInvite();
    //Check if user is already in the comp
    const checkUserInComp = async () => {
      try {
        const userRef = doc(db, compName, uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists() && !inviteCode) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserInComp();
  }, [user, compName, inviteCode, navigate]);

  return (
    <div>
      <Navbar />
      <Transitions>
        <UserCarousel />
      </Transitions>
    </div>
  );
};

export default Comp;
