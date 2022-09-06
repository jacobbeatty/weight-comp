import {React, useEffect} from "react";
import {Navigate} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import {useParams} from "react-router-dom";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";

const ProtectedRoute = ({children}) => {
  let {compName} = useParams();

  const {user} = UserAuth();
  // const {uid, displayName, photoURL} = user;
  // console.log("ProtectedRoute", uid);
  // const compRef = doc(db, compName, uid);
  // const checkUserInComp = async () => {
  //   const compSnap = await getDoc(compRef);
  //   if (!compSnap.exists()) {
  //     return <Navigate to="/" />;
  //   } else {
  //     console.log("user in comp");
  //   }
  // };
  // checkUserInComp();

  if (!user) {
    console.log("user is not logged in");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
