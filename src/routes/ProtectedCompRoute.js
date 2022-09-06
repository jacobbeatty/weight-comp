import {React, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import {useParams} from "react-router-dom";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";

const ProtectedCompRoute = ({children}, uid) => {
  let {compName} = useParams();
  const {user} = UserAuth();
  console.log("ProtectedCompRoute", uid);

  const compRef = doc(db, compName, uid);
  const checkUserInComp = async () => {
    try {
      const compSnap = await getDoc(compRef);
      if (!compSnap.exists()) {
        return <Navigate to="/" />;
      }
    } catch (error) {
      console.log(error);
    }
    return children;
  };

  checkUserInComp();
};

export default ProtectedCompRoute;
