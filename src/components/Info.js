import React from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {
  doc,
  getDocs,
  collection,
  deleteDoc,
  query,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import {db} from "../firebase-config.js";

const Info = () => {
  const navigate = useNavigate();
  //Grab compName from url
  let {compName} = useParams();
  const handleDeleteComp = async () => {
    console.log("Delete comp");
    //Delete all documents in the compName collection
    const compRef = collection(db, compName);
    const q = query(compRef);
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => doc.data());
    results.forEach(async (result) => {
      //Remove the compName from the user's comp array in the userInfo collection
      const userInfoRef = doc(db, "userInfo", result.uid);
      await updateDoc(userInfoRef, {
        comps: arrayRemove(compName),
      });
      //Remove the compName from the compInfo collection
      const compInfoRef = doc(db, "compInfo", compName);
      await deleteDoc(compInfoRef);
      //Delete all users docs in the compName collection
      const docRef = doc(db, compName, result.uid);
      await deleteDoc(docRef);
    });
    //Navigate to home page
    navigate("/");
  };
  return (
    <div>
      <button className="button mr-2 mb-2" onClick={() => handleDeleteComp()}>
        Delete Comp
      </button>
    </div>
  );
};

export default Info;
