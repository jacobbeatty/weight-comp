import {React, useState, useEffect} from "react";
import UserCard from "./UserCard";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";
import {useParams} from "react-router-dom";

const UserCarousel = () => {
  //Grab compName from url
  let {compName} = useParams();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    const infoRef = doc(db, "compInfo", compName);

    const getInfo = async () => {
      const infoSnap = await getDoc(infoRef);
      const info = infoSnap.data();

      setEndDate(info.endDate.toDate());
    };
    //Get comp info on mount
    getInfo();
  }, [compName]);

  return (
    <div className="flex justify-center">
      <UserCard />
      <div
        id="finishLine"
        className="hidden md:flex w-1 border-l-8 border-dashed border-white "
      ></div>
      <h1 className="hidden md:flex rotate-90 text-white text-3xl  h-fit w-fit text-center self-center font-semibold whitespace-nowrap">
        {endDate ? endDate.toDateString() : "Loading..."}
      </h1>
    </div>
  );
};

export default UserCarousel;
