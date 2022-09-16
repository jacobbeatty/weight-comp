import {React, useState, useEffect} from "react";
import UserCard from "./UserCard";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";
import {useParams} from "react-router-dom";

const UserCarousel = () => {
  let {compName} = useParams();
  const infoRef = doc(db, "compInfo", compName);
  const [endDate, setEndDate] = useState();

  const getInfo = async () => {
    const infoSnap = await getDoc(infoRef);
    const info = infoSnap.data();

    setEndDate(info.endDate.toDate());
  };

  useEffect(() => {
    getInfo();
  }, []);

  console.log(endDate);

  return (
    <div className="flex justify-center">
      <UserCard />
      {/* create finish line */}
      <div
        id="finishLine"
        className="w-1 border-l-8 border-dashed border-white "
      ></div>
      <h1 className="rotate-90 text-white text-3xl  h-fit w-fit text-center self-center font-semibold whitespace-nowrap">
        {endDate ? endDate.toDateString() : "Loading..."}
      </h1>
    </div>
  );
};

export default UserCarousel;
