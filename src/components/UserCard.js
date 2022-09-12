import React from "react";
import {useState, useEffect} from "react";
import {db} from "../firebase-config";
import {collection, onSnapshot} from "firebase/firestore";
import {useParams} from "react-router-dom";

const UserCard = () => {
  const [users, setUsers] = useState([]);
  let {compName} = useParams();

  useEffect(() => {
    onSnapshot(collection(db, compName), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    );
  });

  return (
    <div className="flex flex-col sm:flex-row sm:w-[95%] h-fit ">
      {users.map((user) => {
        const percentageLost = user.percentageLost;

        return (
          <div
            key={user.displayName}
            className="w-[95vw]  h-[49vh] sm:h-[40vh]    drop-shadow-xl flex justify-center items-end p-2"
          >
            <div className="w-[100px] h-[100px] flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-full text-center z-50">
              {percentageLost ? (
                <p className="!opacity-100 text-white">
                  {user.displayName} has lost {percentageLost}%.
                </p>
              ) : (
                <p className="!opacity-100 text-white">Please add data.</p>
              )}
            </div>

            <img
              className="w-[300px] h-[300px] object-cover m-10 rounded-full absolute opacity-70"
              src={
                user.photoURL ||
                "https://steamuserimages-a.akamaihd.net/ugc/934934926476985171/5182552889AF62A2AE66B8C79CD41D1FF66B03AD/?imw=512&imh=511&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
              }
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
