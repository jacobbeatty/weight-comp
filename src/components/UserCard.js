import React from "react";
import {useState, useEffect} from "react";
import {db} from "../firebase-config";
import {collection, onSnapshot} from "firebase/firestore";
import {useParams} from "react-router-dom";

const UserCard = () => {
  const [users, setUsers] = useState([]);
  //Grab compName from url
  let {compName} = useParams();

  useEffect(() => {
    const usersRef = collection(db, compName);

    //Get list of users in comp from compName collection and store in users state
    const unsubscribe = onSnapshot(usersRef, (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    );
    return unsubscribe;
  }, [compName]);

  return (
    <div className="flex flex-col  sm:w-[95%] h-fit ">
      {users.map((user) => {
        const percentageLost = user.percentageLost;
        return (
          <div
            key={user.displayName}
            className="w-[85vw]  h-[49vh] sm:h-[35vh] xl:h-[30vh] drop-shadow-xl flex items-end sm:items-center p-2 justify-center sm:justify-start "
          >
            <div className="sm:hidden flex w-[100px] h-[100px] items-center justify-center bg-black/70 backdrop-blur-sm rounded-full text-center z-50 absolute">
              {percentageLost ? (
                <p className="!opacity-100 text-white">
                  {user.displayName} has lost {percentageLost}%.
                </p>
              ) : (
                <p className="!opacity-100 text-white">Please add data.</p>
              )}
            </div>

            <img
              className="w-[300px] h-[300px] object-cover m-10 rounded-full opacity-70"
              src={
                user.photoURL ||
                "https://steamuserimages-a.akamaihd.net/ugc/934934926476985171/5182552889AF62A2AE66B8C79CD41D1FF66B03AD/?imw=512&imh=511&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
              }
              alt=""
            />
            <div
              className="hidden sm:inline h-6"
              style={{width: percentageLost * 80}}
            >
              <div className="bg-gradient-to-r from-transparent to-white h-6 rounded-full"></div>
              <h1 className="text-end text-white text-3xl">{percentageLost}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
