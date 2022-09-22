import {React, useState, useEffect} from "react";
import UserCard from "./UserCard";
import {db} from "../firebase-config";
import {doc, getDoc} from "firebase/firestore";
import {useParams} from "react-router-dom";
import Transitions from "./Transitions";

const UserCarousel = () => {
  //Grab compName from url
  let {compName} = useParams();
  const [endDate, setEndDate] = useState();
  const [dateReached, setDateReached] = useState(false);

  useEffect(() => {
    const infoRef = doc(db, "compInfo", compName);

    const getInfo = async () => {
      const infoSnap = await getDoc(infoRef);
      const info = infoSnap.data();
      setEndDate(info.endDate.toDate());
    };
    //Get endDate on mount
    getInfo();

    // Check isDateReached
    const today = new Date();
    if (today > endDate) {
      setDateReached(true);
    } else {
      setDateReached(false);
    }
  }, [compName]);

  return (
    <Transitions>
      <div className="flex justify-center">
        <UserCard />
        <div
          id="finishLine"
          className="hidden md:flex w-1 border-l-8 border-dashed border-white "
        ></div>
        <h1 className="hidden md:flex rotate-90 text-white text-3xl  h-fit w-fit text-center self-center font-semibold whitespace-nowrap">
          {endDate && dateReached === false
            ? endDate.toDateString()
            : "Loading..."}
          {endDate && dateReached === true ? "Competition ended!" : null}
        </h1>
      </div>
    </Transitions>
  );
};

export default UserCarousel;
