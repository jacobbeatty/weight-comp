import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

const UserCard = () => {
  const [users, setUsers] = useState([]);
  // const usersRef = collection(db, "users");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getUsers();
  // }, []);

  //TRYING
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  });
  //TRYING

  //PULL THIS FROM FIREBASE
  return (
    <div className="">
      {users.map((user) => {
        const percentageLostDec = user.percentageLost.toFixed(2);

        return (
          <div
            key={user}
            className="w-[100vw] h-[45vh]  drop-shadow-xl flex justify-center items-end p-2"
          >
            {/* User Bubble  */}
            <div className="w-[100px] h-[100px] flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-full text-center z-50">
              <p className="!opacity-100 text-white">
                {user.displayName} has lost {percentageLostDec}%.
              </p>
            </div>
            {/* User Bubble  */}
            {/* Background Image */}
            <img
              className="w-[300px] h-[300px] object-cover m-10 rounded-full absolute opacity-70"
              src={user.photoURL}
              alt=""
            />
            {/* Background Image */}
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
